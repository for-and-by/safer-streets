export function getPageRange(count: number, page: number = 1) {
  const lowerRange = count * (page - 1) - 1;
  const upperRange = lowerRange + count;
  return [lowerRange, upperRange];
}
