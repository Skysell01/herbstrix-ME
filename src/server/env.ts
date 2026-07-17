export function getEnvVar(name: string): string | undefined {
  // 1. Try process.env dynamically (Vite won't replace new Function at build time)
  try {
    const proc = new Function("return process")();
    if (proc && proc.env && proc.env[name] !== undefined) {
      return proc.env[name];
    }
  } catch {}

  // 2. Try globalThis.process.env
  try {
    if (typeof globalThis !== "undefined") {
      const proc = (globalThis as any).process;
      if (proc && proc.env && proc.env[name] !== undefined) {
        return proc.env[name];
      }
    }
  } catch {}

  // 3. Try globalThis[name] (Cloudflare Workers global bindings fallback)
  try {
    if (typeof globalThis !== "undefined" && (globalThis as any)[name] !== undefined) {
      return String((globalThis as any)[name]);
    }
  } catch {}

  // 4. Try import.meta.env
  try {
    const metaEnv = (import.meta as any).env;
    if (metaEnv && metaEnv[name] !== undefined) {
      return metaEnv[name];
    }
  } catch {}

  return undefined;
}
