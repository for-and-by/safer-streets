export function getPageRange(count: number, page: number = 1) {
  const lowerRange = count * (page - 1) - 1;
  const upperRange = lowerRange + count;
  return [lowerRange, upperRange];
}

export function parseImageUrl(url?: string | null) {
  if (!url) return undefined;
  const image = new URL(url?.replace("/users/users", "/users"));
  return image.toString();
}
