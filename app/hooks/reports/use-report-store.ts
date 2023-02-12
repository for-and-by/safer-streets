import type { StateCreator } from "zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Report } from "~/types/db";
import type { FormValues } from "~/types/form";

import fetchReports from "~/lib/fetch-reports";
import uploadFile from "~/lib/upload-file";
import uploadReport from "~/lib/upload-report";

interface State {
  reports: Report[];
  activeReportId: Report["id"];
  lastSynced: string;
  isSyncing: boolean;
  isUploading: boolean;
}

interface Actions {
  uploadReport: (values: FormValues) => Promise<void>;
  syncReports: () => Promise<void>;
  setActiveReportId: (id: Report["id"]) => void;
}

interface Store extends Actions, State {}

const initialState: State = {
  reports: [],
  activeReportId: undefined,
  lastSynced: new Date(0).toISOString(),
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
    const { reports: currentReports, lastSynced } = get();
    set({ isSyncing: true });

    const freshReports = await fetchReports({
      lastSynced: new Date(lastSynced).toISOString(),
    });

    const unchangedReports = currentReports.filter((current) => {
      return !freshReports.some((fresh) => fresh.id === current.id);
    });

    const updatedLastSynced = freshReports.reduce((date, { updated_at }) => {
      if (!updated_at) return date;
      return Math.max(new Date(updated_at).getTime(), date);
    }, 0);

    set({
      reports: [...unchangedReports, ...freshReports],
      isSyncing: false,
      lastSynced: new Date(updatedLastSynced).toISOString(),
    });
  },
  setActiveReportId: (id: Report["id"]) => {
    set({
      activeReportId: id,
    });
  },
});

export const useReportStore = create<Store>()(
  persist(store, {
    name: "reports",
  })
);
