export default function getIsoNow() {
  return new Date(Date.now()).toISOString();
}

export function parseDateAsString(date?: string) {
  return date ? new Date(date).toLocaleDateString() : undefined;
}
