export function json<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("Couldn't not parse as JSON:", { value });
    return undefined;
  }
}
