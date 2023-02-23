import React from 'react';
import {useLoaderData} from '@remix-run/react';

import useMapSource from '~/hooks/map/use-map-source';

import ReportClustersLayer from '~/components/molecules/reports/clusters';
import ReportIconsLayer from '~/components/molecules/reports/icons';

import type {ReportFull} from '~/types/db';
import {MapImages} from '~/components/molecules/reports/images';
import {parseDatesFromReport} from '~/utils/date';

export default function Reports() {
	const loader = useLoaderData();
	const reports = loader.reports as ReportFull[];

	useMapSource({
		id: 'reports',
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: reports?.map((report) => {
				const {verifyDate, expiryDate} = parseDatesFromReport(report);
				const isAging = verifyDate && verifyDate.valueOf() < Date.now();
				let isHidden = report.content.is_deleted || (expiryDate && expiryDate.valueOf() < Date.now());

				return {
					type: 'Feature',
					properties: {
						...report,
						...report.content,
						is_hidden: isHidden,
						is_aging: isAging
					},
					geometry: {
						type: 'Point',
						coordinates: [report.lng, report.lat],
					},
				};
			}),
		},
		filter: ['!', ['get', 'is_hidden']],
		cluster: true,
	});

	return (
		<>
			<MapImages/>
			<ReportClustersLayer source="reports"/>
			<ReportIconsLayer/>
		</>
	);
}
