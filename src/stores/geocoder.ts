import create, { StateCreator } from "zustand";
import { SearchFeature } from "~/types/search";
import geocode from "~/lib/geocode";

interface State {
  query: string;
  isLoading: boolean;
  results: SearchFeature[];
}

interface Actions {
  setQuery: (value: State["query"]) => void;
  fetchResults: () => Promise<void>;
  clearResults: () => void;
  resetSearch: () => void;
}

interface Store extends Actions, State {}

const initialState: State = {
  query: "",
  isLoading: false,
  results: [],
};

const store: StateCreator<Store> = (set, get) => ({
  ...initialState,
  setQuery: (value) => {
    set({ query: value });
  },
  fetchResults: async () => {
    const { query, clearResults } = get();
    if (query !== "") {
      set({ isLoading: true });
      const results = await geocode(query);
      set({
        results,
        isLoading: false,
      });
    } else {
      clearResults();
    }
  },
  clearResults: () => set({ results: initialState.results }),
  resetSearch: () => set(initialState),
});

export const useGeocoderStore = create<Store>(store);
