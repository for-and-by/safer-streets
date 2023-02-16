import { useFilterStore } from "~/hooks/filter/use-filter-store";

export function useFilterLoadState() {
  const { isLoading } = useFilterStore();
  return isLoading;
}
