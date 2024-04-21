import { useMapEvent } from "~/hooks/map/use-map-event";

export function useMapImages(images: { id: string; url: string }[]) {
  useMapEvent("styledata", (event) => {
    images.forEach((data) => {
      event.target
        .loadImage(`${window.location.origin}${data.url}`)
        .then((response) => {
          if (event.target.hasImage(data.id)) return;
          event.target.addImage(data.id, response.data);
        });
    });
  });
}
