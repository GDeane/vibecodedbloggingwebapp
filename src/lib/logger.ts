export function info(message: string, meta?: unknown) {
  console.info(new Date().toISOString(), "INFO", message, meta ?? "");
}

export function warn(message: string, meta?: unknown) {
  console.warn(new Date().toISOString(), "WARN", message, meta ?? "");
}

export function error(message: unknown, meta?: unknown) {
  console.error(new Date().toISOString(), "ERROR", message, meta ?? "");
}

