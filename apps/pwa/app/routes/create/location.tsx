import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

import { useCreateOutlet } from "~/routes/create";
import { useMapLock } from "~/hooks/map/use-map-lock";

import { Warning } from "~/components/composites/warning";
import LocationField from "~/components/fields/location-field";
import Footer from "~/components/regions/footer";
import { useFormContext } from "react-hook-form";

export default function CreateLocation() {
  const [, { setUnlock }] = useMapLock();
  const { setStage } = useCreateOutlet();
  const navigate = useNavigate();
  const { trigger } = useFormContext();

  const handleNext = () => {
    trigger().then((result) => {
      if (result) {
        navigate("/create/details");
      }
    });
  };

  useEffect(() => {
    setUnlock();
    setStage({
      heading: "Set Address",
      step: 1,
      progress: 20,
    });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Footer>
      <div className="divider-gray-200 flex flex-col divide-y bg-white">
        <div className="p-3">
          <p className="text-base">
            Use the pin or drag the map to where the reports is referring to.
          </p>
        </div>
        <div className="space-y-2 p-2">
          <LocationField />
        </div>
        <div className="flex flex-row justify-between p-2">
          <Warning.Trigger className="btn btn-light">
            <p className="btn-text">Cancel</p>
          </Warning.Trigger>
          <button onClick={handleNext} className="btn btn-light">
            <p className="btn-text">Add Details</p>
            <i className="btn-icon icon icon-arrow-right" />
          </button>
        </div>
      </div>
    </Footer>
  );
}
