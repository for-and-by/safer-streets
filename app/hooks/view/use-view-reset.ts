import { useViewStore } from '~/hooks/view/use-view-store';

export default function useViewReset() {
	return useViewStore((state) => state.resetView);
}
