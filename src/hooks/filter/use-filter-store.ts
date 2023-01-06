import { Severity, Type } from "~/types/db";
import create, { StateCreator } from "zustand";
import fetchSeverities from "~/lib/fetch-severities";

interface State {
  severities: Severity[];
  types: Type[];
}

interface Actions {
  listSeverities: () => Severity[];
  fetchSeverities: () => Promise<void>;
  listTypes: () => Type[];
  fetchTypes: () => Promise<void>;
}

interface Store extends Actions, State {}

const initialState: State = {
  severities: [],
  types: [],
};

const store: StateCreator<Store> = (set, get) => ({
  ...initialState,
  listSeverities: () => {
    const { severities } = get();
    return severities;
  },
  fetchSeverities: async () => {
    const { severities } = get();
    if (severities.length === 0) {
      const data = await fetchSeverities();
      set({ severities: data });
    }
  },
  listTypes: () => {
    const { types } = get();
    return types;
  },
  fetchTypes: async () => {
    const { types } = get();
    if (types.length === 0) {
      const data = await fetchSeverities();
      set({ severities: data });
    }
  },
});

export const useFilterStore = create<Store>(store);
