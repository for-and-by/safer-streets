import { useEffect } from "react";
import useMapLock from "~/hooks/map/use-map-lock";
import { useCreateForm } from "~/contexts/create";

import Toast from "~/components/regions/toast";
import Drawer from "~/components/composites/drawer";
import FindSelfButton from "~/components/elements/find-self-button";
import useMapCenter from "~/hooks/map/use-map-center";
import useGeocoderInline from "~/hooks/geocoder/use-geocoder-inline";
import parseLngLat from "~/lib/parse-lng-lat";

export default function LocationStage() {
  const [isLocked, { setLock, setUnlock }] = useMapLock();
  const [center, setCenter] = useMapCenter();

  const { isLoading, results } = useGeocoderInline(center);
  const form = useCreateForm();

  console.log(results, form.inputs.values);

  useEffect(() => {
    setUnlock();
  }, []);

  useEffect(() => {
    if (!results?.length && center) {
      const [lng, lat] = parseLngLat(center);
      form?.inputs?.update({ lng, lat, address: results?.[0]?.heading });
    }
  }, [results]);

  function handleNextStage() {
    setLock();
    form.stage.next();
  }

  return (
    <>
      <Toast show={isLoading} content={"Searching for address..."} />
      <Drawer.Row className="p-2">
        <div className="flex w-full flex-row items-center space-x-2 rounded bg-gray-100 p-3">
          {!form.inputs.values.address ? (
            <>
              <i className="icon icon-circle-anim icon-is-spinning before:text-gray-500" />
              <p>Searching for address...</p>
            </>
          ) : (
            <>
              <div className="space-y flex flex-grow flex-col">
                <p className="text-gray-400">Approximate Address</p>
                <p className="font-medium">{form.inputs.values.address}</p>
              </div>
              {/*TODO: Sometimes the Find Self button bugs out*/}
              <FindSelfButton />
            </>
          )}
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2"></Drawer.Row>
    </>
  );
}
