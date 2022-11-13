import React from 'react';
import InfoModal from '~/components/modals/info';

export default function TopBar() {
	return (
		<div className="pointer-events-auto flex w-full flex-row bg-base-100">
			<div className="flex flex-grow flex-row space-x-4 py-1 px-2">
				<p className="text-sm text-base-900">
          Endorsed By Jonathan Sriranganathan
				</p>
			</div>
			<InfoModal className="flex h-full items-center px-2">
				<i className="icon icon-info icon-sm before:text-brand-700" />
			</InfoModal>
		</div>
	);
}
