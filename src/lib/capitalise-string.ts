export default function capitaliseString(string: string) {
  const head = string.charAt(0);
  const tail = string.slice(1);

  return head.toUpperCase() + tail.toLowerCase();
}
