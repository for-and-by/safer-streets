import React, { useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { useFormContext } from "react-hook-form";

import { useCreateOutlet } from "~/routes/create";

import { useMapLock } from "~/hooks/map/use-map-lock";

import Footer from "~/components/regions/footer";

import SeverityField from "~/components/fields/severity-field";
import TypeField from "~/components/fields/type-field";
import CustomField from "~/components/fields/custom-field";
import DetailsField from "~/components/fields/details-field";


export default function CreateDetails() {
  const [, { setLock }] = useMapLock();
  const { setStage } = useCreateOutlet();

  const navigate = useNavigate();
  const { trigger } = useFormContext();

  const handleNext = () => {
    trigger().then((result) => {
      if (result) {
        navigate("/create/photo");
      }
    });
  };

  useEffect(() => {
    setLock();
    setStage({
      heading: "Confirm Details",
      step: 2,
      progress: 55,
    });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Footer>
      <div className="divider-gray-200 flex flex-col divide-y bg-white">
        <div className="p-3">
          <p className="text-base">Provide some details about the reports.</p>
        </div>
        <div className="space-y-2 p-2">
          <SeverityField />
          <TypeField />
          <CustomField />
          <DetailsField />
        </div>
        <div className="flex flex-row justify-between p-2">
          <Link to="/create/location" className="btn btn-light">
            <i className="btn-icon icon icon-arrow-left" />
            <p className="btn-text">Set Address</p>
          </Link>
          <button onClick={handleNext} className="btn btn-light">
            <p className="btn-text">Add Photo</p>
            <i className="btn-icon icon icon-arrow-right" />
          </button>
        </div>
      </div>
    </Footer>
  );
}
