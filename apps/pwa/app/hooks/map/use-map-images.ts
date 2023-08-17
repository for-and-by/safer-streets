import { useMapEvent } from "~/hooks/map/use-map-event";

export default function useMapImages(images: { id: string; url: string }[]) {
  useMapEvent("styledata", (event) => {
    images.forEach((data) => {
      event.target.loadImage(data.url, (error, image) => {
        if (error) throw error;
        if (image && !event.target.hasImage(data.id))
          event.target.addImage(data.id, image);
      });
    });
  });
}
