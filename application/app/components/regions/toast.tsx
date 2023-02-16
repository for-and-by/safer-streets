import React from 'react';
import clsx from 'clsx';

import useDebounce from '~/hooks/use-debounce';
import Portal from '~/components/atoms/portal';

const REGION_ID = 'toasts';

interface PropsRoot {
	show?: boolean;
	content: string;
}

function Root({show = false, content}: PropsRoot) {
	const debouncedShow = useDebounce(show, 150);
	if (!debouncedShow) return null;

	return (
		<Portal selector={`#${REGION_ID}`}>
			<div
				className={clsx(
					'flex items-center space-x-4 rounded bg-base-900 p-4 text-base-50 transition-all',
					show
						? 'opacity-1 pointer-events-auto'
						: 'pointer-events-none opacity-0'
				)}
			>
				<i className="icon icon-is-spinning icon-spinner z-20 before:text-white"/>
				<p className="text-sm">{content}</p>
			</div>
		</Portal>
	);
}

function Container() {
	return (
		<div
			id={REGION_ID}
			className="inline-flex flex-col justify-end space-y-2"
		/>
	);
}

const Toast = Object.assign(Root, {Container});

export default Toast;
