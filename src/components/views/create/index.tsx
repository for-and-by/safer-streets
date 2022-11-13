import React, { useEffect } from 'react';

import { VIEWS } from '~/hooks/view/use-view-store';
import { STAGE } from '~/hooks/create/use-stages-store';
import useViewIsActive from '~/hooks/view/use-view-is-active';
import useStages from '~/hooks/create/use-stages';
import useMapLock from '~/hooks/map/use-map-lock';

import Header from '~/components/regions/header';
import Footer from '~/components/regions/footer';

import CancelModal from '~/components/layout/create/cancel';
import ProgressBar from '~/components/elements/progress-bar';
import Bumper from '~/components/elements/bumper';
import useStagesReset from '~/hooks/create/use-stages-reset';
import CreatePagination from '~/components/views/create/pagination';
import CreateForm from '~/components/views/create/form';

export default function Create() {
	const isCreateShow = useViewIsActive(VIEWS.CREATE);
	const [isLocked, { setLock, setUnlock }] = useMapLock();

	const [stage] = useStages();
	const resetStages = useStagesReset();

	useEffect(() => {
		if (stage.current === STAGE.LOCATION) {
			setUnlock();
		} else {
			setLock();
		}
	}, [stage]);

	useEffect(() => {
		if (!isCreateShow) resetStages();
	}, [isCreateShow]);

	return (
		<>
			<Header>
				<Bumper show={isCreateShow} className="flex flex-col bg-white">
					<div className="flex flex-row p-2">
						<CancelModal>
							<button className="btn btn-light">
								<i className="btn-icon icon icon-left" />
							</button>
						</CancelModal>
						<div className="flex flex-col px-3">
							<h3 className="font-medium">{stage.heading}</h3>
							<p className="text-sm text-base-400">Step {stage.step} of 4</p>
						</div>
					</div>
					<ProgressBar value={stage.progress} />
				</Bumper>
			</Header>
			<Footer>
				<Bumper
					show={isCreateShow}
					className="divider-gray-200 flex flex-col divide-y bg-white"
				>
					<div>
						<CreateForm />
					</div>
					<div className="p-3">
						<p className="text-base">{stage.description}</p>
					</div>
					<div className="flex flex-row justify-between p-2">
						<CreatePagination />
					</div>
				</Bumper>
			</Footer>
		</>
	);
}
