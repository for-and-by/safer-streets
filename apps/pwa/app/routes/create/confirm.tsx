import React, { useEffect } from "react";
import { Link, useFetcher } from "@remix-run/react";

import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { useCreateOutlet } from "~/routes/create";
import useMapLock from "~/hooks/map/use-map-lock";

import Footer from "~/components/regions/footer";
import SummaryField from "~/components/fields/summary-field";
import Toast from "~/components/regions/toast";

export default function CreateConfirm() {
  const fetcher = useFetcher();

  const [, { setLock }] = useMapLock();
  const { setStage } = useCreateOutlet();

  useEffect(() => {
    setLock();
    setStage({
      heading: "Confirm Location",
      step: 1,
      progress: 20,
    });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleSubmit } = useFormContext();

  const handleSuccess: SubmitHandler<any> = (values) => {
    const data = new FormData();
    data.append("create", JSON.stringify(values));
    fetcher.submit(data, { method: "post", action: "/create/submit" });
  };

  const handleError: SubmitErrorHandler<any> = (errors) => {
    throw errors;
  };

  return (
    <>
      <Toast
        show={fetcher.state === "submitting"}
        content="Uploading report..."
      />
      <Footer>
        <div className="divider-gray-200 flex flex-col divide-y bg-white">
          <div className="p-3">
            <p className="text-base">
              Please confirm that the following details were correct
            </p>
          </div>
          <div className="space-y-2 p-2">
            <SummaryField />
          </div>
          <div className="flex flex-row justify-between p-2">
            <Link to="/create/photo" className="btn btn-light">
              <i className="btn-icon icon icon-arrow-left" />
              <p className="btn-text">Add Photo</p>
            </Link>
            <button
              onClick={handleSubmit(handleSuccess, handleError)}
              className="btn btn-primary"
            >
              <p className="btn-text">Submit</p>
            </button>
          </div>
        </div>
      </Footer>
    </>
  );
}
