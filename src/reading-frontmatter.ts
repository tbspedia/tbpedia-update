import { parseYaml, stringifyYaml } from "obsidian";

export const READING_PROPERTIES = [
  "計劃閱讀", "閱讀狀態", "閱讀層次", "閱讀次數", "想讀日期", "在讀日期",
  "已讀日期", "不讀日期", "棄讀日期", "閱讀感想", "閱讀推薦", "評分",
] as const;

interface Frontmatter { header: string; yaml: string; footer: string; body: string }

function frontmatter(text: string): Frontmatter | undefined {
  const match = /^(\uFEFF?---[ \t]*\r?\n)([\s\S]*?)(^(?:---|\.\.\.)[ \t]*(?:\r?\n|$))/m.exec(text);
  if (!match || match.index !== 0) return undefined;
  return { header: match[1], yaml: match[2], footer: match[3], body: text.slice(match[0].length) };
}

function mapping(yaml: string): Record<string, unknown> {
  const value: unknown = parseYaml(yaml);
  if (value == null) return {};
  if (typeof value !== "object" || Array.isArray(value)) throw new Error("Markdown frontmatter must be a YAML mapping.");
  return value as Record<string, unknown>;
}

// Keep the original spelling, comments, blanks and multiline values for ordinary
// block mappings. Flow mappings and aliases use the YAML parser/serializer below.
function blocks(yaml: string): Map<string, { start: number; end: number; text: string }> {
  const matches = [...yaml.matchAll(/^("[^"\r\n]+"|'[^'\r\n]+'|[^\s\[\]{},#?:][^:\r\n]*):(?=[ \t\r\n]|$)/gm)];
  const result = new Map<string, { start: number; end: number; text: string }>();
  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    const key = Object.keys(mapping(`${match[1]}: null`))[0];
    const start = match.index!;
    const end = matches[index + 1]?.index ?? yaml.length;
    result.set(key, { start, end, text: yaml.slice(start, end) });
  }
  return result;
}

export function preserveReadingFrontmatter(existing: string, incoming: string): string {
  const local = frontmatter(existing);
  if (!local) {
    if (/^\uFEFF?---[ \t]*(?:\r?\n|$)/.test(existing)) throw new Error("Existing Markdown frontmatter has no closing delimiter.");
    return incoming;
  }
  const saved = mapping(local.yaml);
  const keys = READING_PROPERTIES.filter(key => Object.prototype.hasOwnProperty.call(saved, key));
  if (!keys.length) return incoming;
  const release = frontmatter(incoming);
  if (!release && /^\uFEFF?---[ \t]*(?:\r?\n|$)/.test(incoming)) throw new Error("Release Markdown frontmatter has no closing delimiter.");
  const updated = mapping(release?.yaml ?? "");
  const merged = { ...updated };
  for (const key of keys) merged[key] = saved[key];
  const newline = release?.header.includes("\r\n") || (!release && local.header.includes("\r\n")) ? "\r\n" : "\n";
  let yaml: string | undefined;
  try {
    const localBlocks = blocks(local.yaml);
    const releaseBlocks = blocks(release?.yaml ?? "");
    if (keys.every(key => localBlocks.has(key)) && Object.keys(updated).every(key => releaseBlocks.has(key))) {
      const removals = keys.flatMap(key => releaseBlocks.has(key) ? [releaseBlocks.get(key)!] : []).sort((a, b) => b.start - a.start);
      let candidate = release?.yaml ?? "";
      for (const block of removals) candidate = candidate.slice(0, block.start) + candidate.slice(block.end);
      if (candidate && !candidate.endsWith("\n")) candidate += newline;
      for (const key of keys) {
        candidate += localBlocks.get(key)!.text;
        if (!candidate.endsWith("\n")) candidate += newline;
      }
      const parsed = mapping(candidate);
      if (Object.keys(parsed).length === Object.keys(merged).length && Object.keys(merged).every(key => JSON.stringify(parsed[key]) === JSON.stringify(merged[key]))) yaml = candidate;
    }
  } catch { /* Cross-property aliases or complex keys require serialization. */ }
  yaml ??= stringifyYaml(merged).replace(/\r?\n/g, newline);
  if (!yaml.endsWith("\n")) yaml += newline;
  const verified = mapping(yaml);
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(verified, key) || JSON.stringify(verified[key]) !== JSON.stringify(saved[key])) {
      throw new Error(`Could not preserve reading property: ${key}`);
    }
  }
  const header = release?.header ?? `${incoming.startsWith("\uFEFF") ? "\uFEFF" : ""}---${newline}`;
  const footer = release?.footer ?? `---${newline}`;
  return `${header}${yaml}${footer}${release?.body ?? incoming.replace(/^\uFEFF/, "")}`;
}
