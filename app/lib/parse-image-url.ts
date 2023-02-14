interface Options {
  width?: number;
  height?: number;
  quality?: number;
}

export function parseImageUrl(url?: string, options?: Options) {
  if (!url) return undefined;

  const image = new URL(url?.replace("/users/users", "/users"));
  if (options?.width) {
    image.searchParams.set("width", options.width.toString());
  }
  if (options?.height) {
    image.searchParams.set("height", options.height.toString());
  }
  if (options?.quality) {
    image.searchParams.set("quality", options.quality.toString());
  }

  return image.toString();
}
