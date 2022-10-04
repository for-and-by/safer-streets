import { useViewStore, VIEWS } from "~/stores/view";

export default function useViewIsActive(value: VIEWS) {
  const view = useViewStore((state) => state.view);
  return view === value;
}
