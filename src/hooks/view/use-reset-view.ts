import { useViewStore } from "~/stores/view";

export default function useResetView() {
  return useViewStore((state) => state.resetView);
}
