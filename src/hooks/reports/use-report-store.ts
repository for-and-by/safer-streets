import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { Report } from "~/types/db";
import { FormValues } from "~/types/form";

import fetchReports from "~/lib/fetch-reports";
import uploadFile from "~/lib/upload-file";
import uploadReport from "~/lib/upload-report";

interface State {
  reports: Report[];
  isSyncing: boolean;
  isUploading: boolean;
}

interface Actions {
  uploadReport: (values: FormValues) => Promise<void>;
  syncReports: () => Promise<void>;
}

interface Store extends Actions, State {}

const initialState: State = {
  reports: [],
  isSyncing: false,
  isUploading: false,
};

const store: StateCreator<Store, [["zustand/persist", unknown]]> = (
  set,
  get
) => ({
  ...initialState,
  uploadReport: async (values: FormValues) => {
    set({ isUploading: true });
    const { syncReports } = get();
    const imageUrl = await uploadFile(values.image);
    await uploadReport(values, imageUrl);
    set({ isUploading: false });
    await syncReports();
  },
  syncReports: async () => {
    const { reports: currentReports } = get();
    set({ isSyncing: true });

    const updatedAtDates = currentReports.map((report) =>
      report.updated_at ? new Date(report.updated_at).getTime() : 0
    );

    const lastSynced = new Date(Math.max(...updatedAtDates, 0)).toISOString();

    const freshReports = await fetchReports({
      lastSynced,
    });

    // const unchangedReports = currentReports.filter(current => !newReports.some(new => new.id === current.id)));

    const unchangedReports = currentReports.filter((current) => {
      return !freshReports.some((fresh) => fresh.id === current.id);
    });

    set({
      reports: [...unchangedReports, ...freshReports],
      isSyncing: false,
    });
  },
});

export const useReportStore = create<Store>()(
  persist(store, {
    name: "reports",
  })
);
