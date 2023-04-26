export function resizeImage(image: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const maxWidth = 720;

  let { height, width } = image;

  if (image.width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return;

  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.7);
}

export function parseFileAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      if (!event?.target?.result) {
        reject("Target couldn't be processed");
        return;
      }

      const blob = new Blob([event.target.result]);
      const url = URL.createObjectURL(blob);
      const image = new Image();

      image.src = url;
      image.onload = () => {
        const resized = resizeImage(image);
        if (!resized) reject("Image could not be resized");
        else resolve(resized);
      };
    };
    reader.onerror = (error) => reject(error);
  });
}

interface Options {
  width?: number;
  height?: number;
  quality?: number;
}

export function parseImageUrl(url?: string | null, options?: Options) {
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
