import React from 'react';

import { EXIT } from '~/hooks/create/use-stages-store';
import CancelModal from '~/components/layout/create/cancel';
import useStages from '~/hooks/create/use-stages';

export default function CreatePagination() {
	const [stage, { nextStage, prevStage }] = useStages();

	return (
		<>
			{stage.prev === EXIT.CANCEL ? (
				<CancelModal>
					<button className="btn btn-light">
						<p className="btn-text">Cancel</p>
					</button>
				</CancelModal>
			) : (
				<button className="btn btn-light" onClick={prevStage}>
					<p className="btn-text">Go Back</p>
				</button>
			)}
			{stage.next === EXIT.SUBMIT ? (
				<CancelModal>
					<button className="btn btn-light">
						<p className="btn-text">Submit Details</p>
					</button>
				</CancelModal>
			) : (
				<button className="btn btn-primary" onClick={nextStage}>
					<p className="btn-text">Provide Details</p>
				</button>
			)}
		</>
	);
}
