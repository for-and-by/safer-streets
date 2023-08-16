import { CANT_GEOLOCATE } from "~/errors";

import useMapCenter from "~/hooks/map/use-map-center";
import { useAsyncAction } from "~/hooks/use-async-action";

import Toast from "~/components/regions/toast";

type Props = {
  onFound?: () => void;
};

export function FindSelfButton(props: Props) {
  const { onFound } = props;

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
