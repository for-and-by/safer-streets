export function clsa(...classes: (string | undefined)[]) {
  return classes.join(" ");
}

export function generateDataAttributes(attributes: { [key: string]: any }) {
  return Object.keys(attributes).reduce((obj, key) => {
    if (!attributes[key]) return obj;
    return Object.assign(obj, { [`data-${key}`]: attributes[key] });
  }, {} as { [key: string]: any });
}
