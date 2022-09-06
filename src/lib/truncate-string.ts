export default function truncateString(string?: string, length: number = 24) {
  if (!string) return "";
  if (string.length < length) return string;
  return string.slice(0, length) + "...";
}
