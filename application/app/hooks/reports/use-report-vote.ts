import {useReportStore} from '~/hooks/reports/use-reports-store';

export function useReportVote() {
	const voted = useReportStore(state => state.voted);

	const up = useReportStore(state => state.voteUp);
	const down = useReportStore(state => state.voteDown);
	const clear = useReportStore(state => state.voteClear);

	const actions = {up, down, clear};

	return [voted, actions] as [typeof voted, typeof actions];
}