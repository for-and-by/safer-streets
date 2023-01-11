import useMapLayer from '~/hooks/map/use-map-layer';
import colors from '~/lib/colors';

export default function ReportIconsLayer() {


	useMapLayer({
		id: 'reports-bg',
		type: 'circle',
		source: 'reports',
		filter: ['!', ['has', 'point_count']],
		paint: {
			'circle-color': colors?.brand[600],
			'circle-radius': 20,
		},
	});

	useMapLayer({
		id: 'reports-icon',
		type: 'symbol',
		source: 'reports',
		filter: ['!', ['has', 'point_count']],
		layout: {
			'icon-image': '{type_handle}',
			'icon-size': 0.2,
		},
	});

	return null;
}
