export function parseDateAsString(date?: string) {
  return date ? new Date(date).toLocaleDateString() : undefined;
}
