import React from 'react';
import {useLoaderData} from '@remix-run/react';

import useMapSource from '~/hooks/map/use-map-source';

import ReportClustersLayer from '~/components/molecules/reports/clusters';
import ReportIconsLayer from '~/components/molecules/reports/icons';

import type {ReportFull} from '~/types/db';
import {MapImages} from '~/components/molecules/reports/images';
import {useFilterTypes} from '~/hooks/filter/use-filter-types';

export default function Reports() {
	const loader = useLoaderData();
	const reports = loader.reports as ReportFull[];

	const [, getType] = useFilterTypes();

	useMapSource({
		id: 'reports',
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: reports?.map((report) => {
				const type = getType(report.type_handle);

				let isAging = false;
				let isHidden = report.content.is_deleted;
				
				if (report.updated_at && type) {
					const {verify_by, expire_by} = type;
					const lastUpdated = Date.parse(report.updated_at);

					const verifyDate = new Date(lastUpdated + (verify_by * 3_600_000));
					const expiryDate = new Date(lastUpdated + (expire_by * 3_600_000));

					isAging = verifyDate.valueOf() < Date.now();
					isHidden ||= expiryDate.valueOf() < Date.now();
				}
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
