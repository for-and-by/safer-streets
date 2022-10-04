import { useViewStore } from "~/hooks/view/use-view-store";

export default function useView() {
  const view = useViewStore((state) => state.view);
  const setView = useViewStore((state) => state.setView);

  return [view, setView] as [typeof view, typeof setView];
}
