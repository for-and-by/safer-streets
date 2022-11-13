import FindSelfButton from '~/components/elements/find-self-button';
import useMapCenter from '~/hooks/map/use-map-center';
import React, { ComponentProps } from 'react';
import useGeocoderInline from '~/hooks/geocoder/use-geocoder-inline';
import Show from '~/components/elements/show';

type Props = ComponentProps<'input'>

export default function MapCenterInput({ ...props }: Props) {
	const [center] = useMapCenter();
	const { isLoading, results } = useGeocoderInline(center);

	return (
		<div className="flex w-full flex-row items-center space-x-4 rounded bg-gray-100 p-3">
			<div className="space-y flex flex-grow flex-col">
				<p className="text-gray-400">Approximate Address</p>
				<p className="text-gray-900">
					{!isLoading && !!results && results.length > 0
						? results?.[0].heading
						: 'Searching for address...'}
				</p>
			</div>
			<Show on={isLoading}>
				<i className="icon icon-circle-anim icon-is-spinning before:text-black" />
			</Show>

			{/*TODO: Sometimes the Find Self button bugs out*/}
			<FindSelfButton />
		</div>
	);
}
