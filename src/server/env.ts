export function getEnvVar(name: string): string | undefined {
  // Use dynamic access via globalThis to prevent Vite from replacing it at build-time.
  if (typeof globalThis !== "undefined") {
    const proc = (globalThis as any).process;
    if (proc && proc.env && proc.env[name]) {
      return proc.env[name];
    }
  }
  return undefined;
}
