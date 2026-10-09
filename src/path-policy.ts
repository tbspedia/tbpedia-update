import { MANAGED_ROOTS } from "./types";

const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;


export function normalizePath(value: string): string {
  return value.normalize("NFC").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\.\//, "");
}

/** Paths are always relative to the current vault root. */
export function assertManagedPath(value: string): string {
  const path = normalizePath(value);
  if (!path || path.includes("\0") || path.startsWith("/") || /^[A-Za-z]:/.test(path)) throw new Error(`Unsafe path: ${value}`);
  const segments = path.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || /[<>:"|?*]/.test(segment) || RESERVED.test(segment))) {
    throw new Error(`Unsafe path: ${value}`);
  }
  const topLevel = segments[0];
  if ((MANAGED_ROOTS as readonly string[]).includes(topLevel)) {
    return path;
  }
  if ((topLevel === ".obsidian" && segments.length > 1) || (!path.includes("/") && !path.startsWith("."))) return path;
  throw new Error(`Path is outside the managed boundary: ${value}`);
}

export function ensureNoPathConflicts(paths: string[]): void {
  const sorted = [...paths].sort();
  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[i].startsWith(`${sorted[i - 1]}/`)) throw new Error(`File/directory path conflict: ${sorted[i - 1]}`);
  }
}
