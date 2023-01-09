import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { Report } from "~/types/db";
import { FormValues } from "~/types/form";

import fetchReports from "~/lib/fetch-reports";
import uploadFile from "~/lib/upload-file";
import uploadReport from "~/lib/upload-report";

interface State {
  reports: Report[];
  lastSynced: number;
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
  lastSynced: Date.now(),
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
    set({ isSyncing: true });
    const reports = await fetchReports();
    set({
      reports,
      lastSynced: Date.now(),
      isSyncing: false,
    });
  },
});

export const useReportStore = create<Store>()(
  persist(store, {
    name: "reports",
  })
);
