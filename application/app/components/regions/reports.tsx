import React from 'react';
import {useLoaderData} from '@remix-run/react';

import useMapSource from '~/hooks/map/use-map-source';

import ReportClustersLayer from '~/components/molecules/reports/clusters';
import ReportIconsLayer from '~/components/molecules/reports/icons';

import type {ReportFull} from '~/types/db';
import {MapImages} from '~/components/molecules/reports/images';

export default function Reports() {
	const {reports} = useLoaderData<{ reports: ReportFull[] }>();

	useMapSource({
		id: 'reports',
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: reports.map((report) => ({
				type: 'Feature',
				properties: {...report, ...report.content},
				geometry: {
					type: 'Point',
					coordinates: [report.lng, report.lat],
				},
			})),
		},
		cluster: true,
		filter: ['!', ['get', 'is_deleted']],
	});

	useMapSource({
		id: 'reports-new',
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: reports.map((report) => ({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [report.lng, report.lat],
				},
			})),
		},
		cluster: true,
		filter: ['!', ['get', 'is_deleted']],
	});

	return (
		<>
			<MapImages/>
			<ReportClustersLayer source="reports"/>
			<ReportIconsLayer/>
		</>
	);
}
