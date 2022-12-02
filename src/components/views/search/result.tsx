import React from 'react';
import { ComponentProps, MouseEventHandler } from 'react';
import { SearchFeature } from '~/types/search';
import useMapCenter from '~/hooks/map/use-map-center';
import clsx from 'clsx';

interface Props extends ComponentProps<'div'> {
  feature: SearchFeature;
}

export default function SearchResult({
	feature,
	onClick,
	className,
	...props
}: Props) {
	const [, setCenter] = useMapCenter();

	const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
		if (onClick) onClick(event);
		if (feature?.center) setCenter(feature?.center);
	};

	return (
		<div
			{...props}
			className={clsx(
				'flex w-full flex-col bg-white p-3 transition-all hover:cursor-pointer hover:bg-gray-100',
				className
			)}
			onClick={handleClick}
		>
			<p className="text-base text-base-700">{feature?.heading}</p>
			<p className="text-sm text-base-400">{feature?.subheading}</p>
		</div>
	);
}
