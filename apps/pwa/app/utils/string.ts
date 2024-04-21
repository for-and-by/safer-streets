export function truncateString(string?: string, length = 24) {
  if (!string) return "";
  if (string.length < length) return string;
  return string.slice(0, length) + "...";
}

export function capitaliseString(string: string) {
  const head = string.charAt(0);
  const tail = string.slice(1);

  return head.toUpperCase() + tail.toLowerCase();
}
