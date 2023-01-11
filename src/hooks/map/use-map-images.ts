import useMap from "~/hooks/map/use-map";
import useMapEvents from "~/hooks/map/use-map-events";

export default function useMapImages(images: { id: string; url: string }[]) {
  const map = useMap();

  const loadImages = () => {
    if (!map) return;
    images.map((data) => {
      map.loadImage(data.url, (error, image) => {
        if (error) throw error;
        if (image) map.addImage(data.id, image);
      });
    });
  };

  useMapEvents(map, {
    styledata: loadImages,
    data: loadImages,
  });
}
