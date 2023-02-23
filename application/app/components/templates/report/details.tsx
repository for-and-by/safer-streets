import React, {useEffect, useState} from 'react';
import {Link, useRouteLoaderData, useSubmit, useTransition,} from '@remix-run/react';

import type {ReportFull} from '~/types/db';

import Footer from '~/components/regions/footer';
import Toast from '~/components/regions/toast';

import {Warning} from '~/components/composites/warning';
import {ImageCollapse} from '~/components/molecules/image-collapse';
import {parseDateAsString, parseDatesFromReport} from '~/utils/date';

export default function ReportDetailsTemplate() {
	const {state} = useTransition();
	const submit = useSubmit();

	const loader = useRouteLoaderData('routes/report') as { report: ReportFull };
	const data = loader.report;
	const {verifyDate} = parseDatesFromReport(data);

	const [content, setContent] = useState<{ [key: string]: string | undefined }>(
		{}
	);

	useEffect(() => {
		if (data) {
			setContent({
				Details: data.content.details,
				...data.content.data,
				'Created On': parseDateAsString(data.created_at),
				'Last Updated': parseDateAsString(data.updated_at),
			});
		}
	}, [data]);

	const handleDelete = () => {
		submit(null, {action: `/report/${data.id}/delete`, method: 'delete'});
	};

	if (!data) return null;

	return (
		<>
			<Toast content="Deleting report..." show={state === 'submitting'}/>
			<Warning>
				<Footer>
					<div className="max-h-[50vh] divide-y divide-gray-200 overflow-y-scroll">
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
