import { useFilterStore } from "~/hooks/filter/use-filter-store";
import { useEffect } from "react";

export function useFilterTypes() {
  const { types, fetchTypes, isLoading } = useFilterStore();

  useEffect(() => {
    if (!types || types.length === 0) {
      fetchTypes().finally();
    }
  }, [types]);

  return { types, isLoading: isLoading.types };
}
