import { useStagesStore } from '~/hooks/create/use-stages-store';

export default function useStagesReset() {
	return useStagesStore((state) => state.resetStage);
}
