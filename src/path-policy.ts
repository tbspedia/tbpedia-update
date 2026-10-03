import { MANAGED_ROOTS } from "./types";

const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
const OBSIDIAN_FILES = new Set([
  ".obsidian/app.json", ".obsidian/appearance.json", ".obsidian/community-plugins.json",
  ".obsidian/hotkeys.json", ".obsidian/workspace.json", ".obsidian/workspace-mobile.json"
]);

export function normalizePath(value: string): string {
  return value.normalize("NFC").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\.\//, "");
}

export function assertManagedPath(value: string, installRoot: string): string {
  const path = normalizePath(value);
  if (!path || path.includes("\0") || path.startsWith("/") || /^[A-Za-z]:/.test(path)) throw new Error(`Unsafe path: ${value}`);
  const segments = path.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || /[<>:"|?*]/.test(segment) || RESERVED.test(segment))) {
    throw new Error(`Unsafe path: ${value}`);
  }
  if (path.startsWith(`${installRoot}/`)) {
    const child = path.slice(installRoot.length + 1).split("/")[0];
    if (!(MANAGED_ROOTS as readonly string[]).includes(child)) throw new Error(`Path is outside managed roots: ${value}`);
    return path;
  }
  if (OBSIDIAN_FILES.has(path) || (!path.includes("/") && !path.startsWith("."))) return path;
  throw new Error(`Path is outside the managed boundary: ${value}`);
}

export function ensureNoPathConflicts(paths: string[]): void {
  const sorted = [...paths].sort();
  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[i].startsWith(`${sorted[i - 1]}/`)) throw new Error(`File/directory path conflict: ${sorted[i - 1]}`);
  }
}
