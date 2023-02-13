import { Link, useRouteLoaderData, useTransition } from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import SeverityField from "~/components/molecules/fields/severity-field";
import TypeField from "~/components/molecules/fields/type-field";
import CustomField from "~/components/molecules/fields/custom-field";
import DetailsField from "~/components/molecules/fields/details-field";
import ImageField from "~/components/molecules/fields/image-field";
import React from "react";
import Footer from "~/components/regions/footer";
import type { ReportFull } from "~/types/db";
import { parseImageUrl } from "~/lib/parse-image-url";
import Toast from "~/components/regions/toast";

export default function ReportEditTemplate() {
  const { type, state } = useTransition();

  const loader = useRouteLoaderData("routes/report") as { report: ReportFull };
  const data = loader.report;

  const methods = useForm({
    defaultValues: {
      type: data.type_handle,
      severity: data.content.severity_handle,
      image: parseImageUrl(data.content.image_url),
      details: data.content.details,
    },
    mode: "onChange",
  });

  return (
    <>
      <Toast content="Saving new details..." show={state === "submitting"} />
      <Footer show={type !== "normalRedirect"}>
        <div className="max-h-[50vh] divide-y divide-gray-200 overflow-y-scroll">
          <div className="p-3">
            <p>Update the details of this report</p>
          </div>
          <FormProvider {...methods}>
            <div className="flex flex-col space-y-2 p-2">
              <ImageField />
              <SeverityField />
              <TypeField />
              <CustomField />
              <DetailsField />
            </div>
          </FormProvider>
          <div className="sticky bottom-0 flex justify-between bg-white p-2 shadow-md">
            <Link to={`/report/${data.id}`} className="btn btn-light">
              <p className="btn-text">Cancel</p>
            </Link>
            <button className="btn btn-primary">
              <p className="btn-text">Save</p>
            </button>
          </div>
        </div>
      </Footer>
    </>
  );
}
