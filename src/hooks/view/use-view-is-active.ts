import { useViewStore, VIEWS } from '~/hooks/view/use-view-store';

export default function useViewIsActive(value: VIEWS) {
	const view = useViewStore((state) => state.view);
	return view === value;
}
