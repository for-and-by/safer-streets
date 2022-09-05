import resizeImage from "~/lib/resize-image";

export default function getBase64File(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      if (!event?.target?.result) reject("Target couldn't be processed");

      const blob = new Blob([event?.target?.result ?? ""]);
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
