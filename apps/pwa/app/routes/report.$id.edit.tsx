import React from "react";
import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Link, useMatches, useNavigation, useSubmit } from "@remix-run/react";

import type {
  FormUpdateValues,
  Report,
  ReportContent,
} from "@safer-streets/db";

import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

import { parseImageUrl, prepareImageData } from "~/lib/image";
import { getIsoNow } from "@safer-streets/utils";

import Toast from "~/components/regions/toast";
import Footer from "~/components/regions/footer";

import SeverityField from "~/components/fields/severity-field";
import TypeField from "~/components/fields/type-field";
import CustomField from "~/components/fields/custom-field";
import DetailsField from "~/components/fields/details-field";
import ImageField from "~/components/fields/image-field";

/*
 *   This action takes the content of the update form,
 *   creates a new content row and appends it to the report
 * */

export const action: ActionFunction = async ({ request, params, context }) => {
  if (!params.id) return null;

  const form = await request.formData();
  const data = form.get("update");
  if (typeof data !== "string") return null;
  const values = JSON.parse(data);

  const supabase = context.getSupabase();

  // If there's an image, upload it, return the ID
  let image: string | undefined = undefined;
  if (values.image) {
    const { file, location, options } = prepareImageData(values.image);

    const upload = await supabase.storage
      .from("users")
      .upload(location, file, options);

    if (upload.error) throw upload.error;
    if (!upload.data) throw "No data returned";

    const url = supabase.storage.from("users").getPublicUrl(upload.data.path);
    if (!url.data) throw "No url generated";

    image = url.data.publicUrl;
  }

  const report = await supabase
    .from("reports")
    .select("content_id")
    .eq("id", params.id)
    .single();

  if (report.error) throw report.error.message;
  if (!report.data) throw `No report with id ${values.id} found`;

  const content = await supabase
    .from("reports_content")
    .select()
    .eq("id", report.data.content_id)
    .limit(1)
    .single();

  if (content.error) throw content.error;
  if (!content.data) throw `Content ${report.data.content_id} not found.`;

  const { id: _, created_at: __, ...clonedData } = content.data;

  const newData: Partial<ReportContent> = {};
  if (image) newData.image_url = image;
  if (values.severity) newData.severity_handle = values.severity;
  if (values.details) newData.details = values.details;

  const clone = await supabase
    .from("reports_content")
    .insert({ ...clonedData, ...newData })
    .select()
    .limit(1)
    .single();

  if (clone.error) throw clone.error;
  if (!clone.data) throw "No data was returned from content creation";

  const updateData: Partial<Report> = {
    content_id: clone.data.id,
    updated_at: getIsoNow(),
  };

  if (values.type) updateData.type_handle = values.type;

  const update = await supabase
    .from("reports")
    .update(updateData)
    .eq("id", params.id);

  if (update.error) throw update.error;

  return redirect(`/report/${params.id}`);
};

export default function ReportEditTemplate() {
  const { state } = useNavigation();
  const submit = useSubmit();

  const [, loader] = useMatches();
  const data = loader.data.report;

  const methods = useForm<FormUpdateValues>({
    defaultValues: {
      type: data.type_handle,
      severity: data.content.severity_handle,
      image: parseImageUrl(data.content.image_url),
      details: data.content.details,
    },
    mode: "onChange",
  });

  //  This is required for the value to be correct.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const invoke = methods.formState.dirtyFields;

  const onSubmit: SubmitHandler<any> = (values) => {
    const { dirtyFields } = methods.formState;
    const dirtyValues = Object.keys(values).reduce((obj, key) => {
      const value = values[key as keyof FormUpdateValues];
      const isDirty = dirtyFields[key as keyof FormUpdateValues];
      return isDirty ? { ...obj, [key]: value } : obj;
    }, {});

    submit(
      { update: JSON.stringify(dirtyValues) },
      { method: "post", action: `report/${data.id}/edit` }
    );
  };

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
