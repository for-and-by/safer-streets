import type { MapEventGroup } from '~/types/map';
import { useEffect } from 'react';

import useMap from '~/hooks/map/use-map';

export default function useMapEvents(events: MapEventGroup) {
	const map = useMap();

	useEffect(() => {
		Object.keys(events).map((key) => {
			map?.on(key, events[key]);
		});

		return () => {
			Object.keys(events).map((key) => {
				map?.off(key, events[key]);
			});
		};
	}, [map]);
}
