import * as Redux from "@reduxjs/toolkit";
import { Report, SEVERITIES, TYPES } from "~/types/db";
import { Inputs } from "~/contexts/create";

import fetchReports from "~/lib/fetch-reports";
import uploadReport from "~/lib/upload-report";
import fetchTypes from "~/lib/fetch-types";
import uploadFile from "~/lib/upload-file";

const reports = {
  upload: Redux.createAsyncThunk<void, Inputs>(
    "reports/upload",
    async (inputs) => {
      const [type] = await fetchTypes(inputs.type);
      const fields = Object.keys(type.custom_fields);

      const additionalData = fields.reduce((obj, field) => {
        const value = inputs[field as keyof typeof inputs];
        if (!value) return obj;
        return Object.assign(obj, {
          [field]: value,
        });
      }, {});

      if (!(inputs.lng && inputs.lat))
        throw "No valid coordinates provided for reports";

      const imageUrl = await uploadFile(inputs.image);

      const results = await uploadReport({
        lng: inputs?.lng,
        lat: inputs?.lat,
        type_handle: inputs?.type as TYPES,
        is_deleted: false,
        description: inputs?.description ?? "",
        severity_handle: inputs?.severity as SEVERITIES,
        data: additionalData,
        image_url: imageUrl,
      });

      if (results.report.error) throw results.report.error;
      if (results.content.error) throw results.content.error;
    }
  ),
  sync: Redux.createAsyncThunk<Report[]>("reports/list/sync", async () => {
    return await fetchReports();
  }),
};

export default reports;
