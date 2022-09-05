export default function resizeImage(image: HTMLImageElement) {
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
