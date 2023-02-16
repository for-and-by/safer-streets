import useMapImages from '~/hooks/map/use-map-images';

import cyclist from '~/icons/png/cyclist.png';
import fire from '~/icons/png/fire.png';
import flood from '~/icons/png/flood.png';
import motorist from '~/icons/png/motorist.png';
import pedestrian from '~/icons/png/pedestrian.png';
import wildlife from '~/icons/png/wildlife.png';

export function MapImages() {
	useMapImages([
		{
			id: 'cyclist',
			url: cyclist,
		},
		{
			id: 'fire',
			url: fire,
		},
		{
			id: 'flood',
			url: flood,
		},
		{
			id: 'motorist',
			url: motorist,
		},
		{
			id: 'pedestrian',
			url: pedestrian,
		},
		{
			id: 'wildlife',
			url: wildlife
		},
	]);

	return null;
}