import { useViewStore } from "~/stores/view";

export default function useViewReset() {
  return useViewStore((state) => state.resetView);
}
