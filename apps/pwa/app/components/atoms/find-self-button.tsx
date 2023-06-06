import Toast from "~/components/regions/toast";
import useMapCenter from "~/hooks/map/use-map-center";
import { useAsyncAction } from "~/hooks/use-async-action";

const CANT_GEOLOCATE = "Geolocation not available on this browser.";

interface Props {
  onFound?: () => void;
}

export function FindSelfButton({ onFound }: Props) {
  const [, setCenter] = useMapCenter();
  const { isLoading, handleAsyncAction } = useAsyncAction({
    action: () => {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        if (!(navigator && "geolocation" in navigator)) reject(CANT_GEOLOCATE);
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    onSuccess: (data) => {
      const { longitude, latitude } = data.coords;
      if (onFound) onFound();
      setCenter([longitude, latitude]);
    },
  });

  return (
    <button className="btn btn-primary" onClick={handleAsyncAction}>
      <Toast show={isLoading} content="Finding your location..." />
      <i className="btn-icon icon icon-find-self" />
    </button>
  );
}
