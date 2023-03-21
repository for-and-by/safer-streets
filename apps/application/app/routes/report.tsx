import type {LoaderFunction} from '@remix-run/cloudflare';
import {json, redirect} from '@remix-run/cloudflare';
import {Link, Outlet, useLoaderData} from '@remix-run/react';

import type {MetaArgs} from '~/types/core';
import {config} from '~/config';

import {fetchReportContent} from '~/lib/supabase';
import type {ReportFull} from '~/types/db';
import {useReportOpen} from '~/hooks/reports/use-report-open';
import useMapLock from '~/hooks/map/use-map-lock';
import useMapCenter from '~/hooks/map/use-map-center';
import React, {useEffect} from 'react';
import ReportMarker from '~/components/molecules/markers/report';
import Header from '~/components/regions/header';


export function meta({data}: MetaArgs<typeof loader>) {
	return {
		title: `${data.report.type.title} Report #${data.report.id}  | ` + config.seo.default.title,
		description: data.report.content.details,
		'og-image': data.report.content.image_url,
	};
}

export const loader: LoaderFunction = async ({params}) => {
	if (!params.id) return redirect('/');
	const report = await fetchReportContent(params.id);
	return json({report});
};

export default function Report() {
	const loader = useLoaderData();
	const data = loader.report as ReportFull;

	const [, open] = useReportOpen();
	const [isLocked, {setLock}] = useMapLock();
	const [, setCenter] = useMapCenter();

	useEffect(() => {
		if (!isLocked) setLock();
		open(data.content_id);
		setCenter(data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<ReportMarker coordinates={data}/>
			<Header>
				<div className="flex flex-col divide-y divide-gray-100">
					<div className="flex flex-row items-center bg-white p-2">
						<Link to="/" className="btn btn-light">
							<i className="btn-icon icon icon-arrow-left"/>
						</Link>
						<div className="flex flex-col px-3">
							<h3 className="font-medium">Report Details</h3>
							<p className="text-sm text-base-400">
								Details for Report #{data.id}
							</p>
						</div>
					</div>
				</div>
			</Header>
			<Outlet/>
		</>
	);
}
