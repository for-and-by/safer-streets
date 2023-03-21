import React from 'react';
import {Link, useFetcher, useRouteLoaderData,} from '@remix-run/react';

import type {ReportFull} from '~/types/db';

import Footer from '~/components/regions/footer';
import Toast from '~/components/regions/toast';

import {Warning} from '~/components/composites/warning';
import {ImageCollapse} from '~/components/molecules/image-collapse';
import {parseDateAsString, parseDatesFromReport} from '~/utils/date';
import Body from '~/components/regions/body';

export default function ReportDetailsTemplate() {
	const verifyReport = useFetcher();
	const deleteReport = useFetcher();

	const loader = useRouteLoaderData('routes/report');
	const data = (loader as any).report as ReportFull;
	const {verifyDate} = parseDatesFromReport(data);

	const handleDelete = () => {
		deleteReport.submit(null, {action: `/report/${data.id}/delete`, method: 'delete'});
	};

	const handleVerify = () => {
		verifyReport.submit(null, {action: `/report/${data.id}/verify`, method: 'patch'});
	};

	if (!data) return null;

	return (
		<>
			<Toast content="Deleting report..." show={deleteReport.state === 'submitting'}/>
			<Toast content="Verifying report..." show={verifyReport.state === 'submitting'}/>
			<Body>
				{verifyDate && verifyDate.valueOf() < Date.now() ? (
					<Warning>
						<div className="p-3 flex flex-row justify-between items-center bg-gray-900 rounded">
							<p className="font-medium text-white">This report is getting old.</p>
							<Warning.Trigger onClick={handleVerify} className="text-brand-400">
								<p className="btn-text">Verify</p>
							</Warning.Trigger>
						</div>
						<Warning.Panel
							heading="Verify Report"
							body="This report is getting close to it's expiry date. If you know that this report is still relevant, please either verify this report here, or update the information."
							onConfirm={handleVerify}
						/>
					</Warning>

				) : null}
			</Body>
			<Warning>
				<Footer>
					<div className="max-h-[40vh] divide-y divide-gray-200 overflow-y-scroll">
						{data.content.image_url ? (
							<ImageCollapse src={data.content.image_url}/>
						) : null}
						<div className="flex flex-row items-center bg-white p-2 space-x-2">
							{verifyDate && verifyDate.valueOf() < Date.now() ?
								<p className="text-white text-sm px-1 rounded bg-gray-800 my-1">
									Needs Verifying
								</p>
								: null
							}
							<p className="text-gray-700 text-sm px-1 rounded bg-gray-100 my-1">
								{data.content.severity.title}
							</p>
						</div>
						<div className="p-3">
							<p className="font-medium">Details</p>
							<p>{data.content.details}</p>
						</div>
						<div className="p-3 flex flex-col">
							<div className="flex flex-row justify-between">
								<p className="text-gray-400">Last Updated</p>
								<p>{parseDateAsString(data.updated_at)}</p>
							</div>
							<div className="flex flex-row justify-between">
								<p className="text-gray-400">Created On</p>
								<p>{parseDateAsString(data.created_at)}</p>
							</div>
						</div>
						<div className="p-3 flex flex-col">
							<div className="flex flex-row justify-between">
								<p className="text-gray-400">Report ID</p>
								<p>{data.id}</p>
							</div>
							<div className="flex flex-row justify-between">
								<p className="text-gray-400">Content ID</p>
								<p>{data.content_id}</p>
							</div>
						</div>

						<div className="sticky bottom-0 flex justify-between bg-white p-2 shadow-md">
							<Link to={`/report/${data.id}/edit`} className="btn btn-primary">
								<p className="btn-text">Edit Report</p>
							</Link>
							<Warning.Trigger className="btn btn-light">
								<p className="btn-text">Delete</p>
							</Warning.Trigger>
						</div>
					</div>
				</Footer>
				<Warning.Panel
					heading="Delete Report"
					body="Are you sure you want to delete this report? You won't be able to recover it without "
					onConfirm={handleDelete}
				/>
			</Warning>
		</>
	);
}
