import React from "react";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { FormUpdateValues, ReportFull } from "@safer-streets/db";
import { updateReport, uploadFile } from "@safer-streets/db";
import {
  Link,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "@remix-run/react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

import Toast from "~/components/regions/toast";
import Footer from "~/components/regions/footer";

import SeverityField from "~/components/fields/severity-field";
import TypeField from "~/components/fields/type-field";
import CustomField from "~/components/fields/custom-field";
import DetailsField from "~/components/fields/details-field";
import ImageField from "~/components/fields/image-field";
import { parseImageUrl } from "~/lib/image";

export const action: ActionFunction = async ({ request, params }) => {
  if (!params.id) return null;
  const form = await request.formData();
  const data = form.get("update");

  if (typeof data !== "string") return null;
  const values = JSON.parse(data);

  const imageUrl = values.image ? await uploadFile(values.image) : undefined;
  await updateReport({ ...values, id: params.id }, imageUrl);
  return redirect(`/report/${params.id}`);
};

export default function ReportEditTemplate() {
  const { state } = useNavigation();
  const submit = useSubmit();

  const loader = useRouteLoaderData("routes/report/$id") as {
    report: ReportFull;
  };
  const data = loader.report;

  const methods = useForm<FormUpdateValues>({
    defaultValues: {
      type: data.type_handle,
      severity: data.content.severity_handle,
      image: parseImageUrl(data.content.image_url),
      details: data.content.details,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = (values) => {
    const dirtyValues = Object.keys(values).reduce((obj, key) => {
      const value = values[key as keyof FormUpdateValues];
      const isDirty =
        methods.formState.dirtyFields[key as keyof FormUpdateValues];
      return isDirty ? { ...obj, [key]: value } : obj;
    }, {});

    submit(
      { update: JSON.stringify(dirtyValues) },
      { method: "post", action: `report/${data.id}/edit` }
    );
  };

  console.log(methods.formState.dirtyFields);

  return (
    <>
      <Toast content="Saving new details..." show={state === "submitting"} />
      <Footer>
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
            <button
              className="btn btn-primary"
              onClick={methods.handleSubmit(onSubmit)}
            >
              <p className="btn-text">Save</p>
            </button>
          </div>
        </div>
      </Footer>
    </>
  );
}
