import React, { useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";

import { useCreateOutlet } from "~/routes/create";

import { useMapLock } from "~/hooks/map/use-map-lock";

import Footer from "~/components/regions/footer";
import ImageField from "~/components/fields/image-field";
import { useFormContext } from "react-hook-form";

export default function CreateImage() {
  const [, { setLock }] = useMapLock();
  const { setStage } = useCreateOutlet();
  const navigate = useNavigate();
  const { trigger } = useFormContext();

  const handleNext = () => {
    trigger().then((result) => {
      if (result) {
        navigate("/create/confirm");
      }
    });
  };

  useEffect(() => {
    setLock();
    setStage({
      heading: "Add Photo",
      step: 3,
      progress: 80,
    });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Footer>
      <div className="divider-gray-200 flex flex-col divide-y bg-white">
        <div className="p-3">
          <p className="text-base">Add an image to the reports.</p>
        </div>
        <div className="space-y-2 p-2">
          <ImageField />
        </div>
        <div className="flex flex-row justify-between p-2">
          <Link to="/create/details" className="btn btn-light">
            <i className="btn-icon icon icon-arrow-left" />
            <p className="btn-text">Add Details</p>
          </Link>
          <button onClick={handleNext} className="btn btn-light">
            <p className="btn-text">Confirm</p>
            <i className="btn-icon icon icon-arrow-right" />
          </button>
        </div>
      </div>
    </Footer>
  );
}
