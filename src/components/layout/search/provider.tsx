import React from "react";
import createContextHook from "~/lib/create-context-hook";
import useGeocoder from "~/hooks/use-geocoder";
import { SearchFeature } from "~/types/search";
import useDebounce from "~/hooks/use-debounce";

interface ContextValue {
  query: {
    set: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    debouncedValue: string;
  };
  loading: boolean;
  results: SearchFeature[];
}

interface Props {
  children?: React.ReactNode;
}

const initialValue: ContextValue = {
  query: {
    set: () => {},
    value: "",
    debouncedValue: "",
  },
  loading: false,
  results: [],
};

const SearchContext = React.createContext(initialValue);

export const useSearch = createContextHook({
  SearchContext,
});

export function SearchProvider({ children }: Props) {
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query);

  const { results, loading } = useGeocoder(debouncedQuery);

  const value: ContextValue = {
    query: {
      set: setQuery,
      value: query,
      debouncedValue: debouncedQuery,
    },
    results,
    loading,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
