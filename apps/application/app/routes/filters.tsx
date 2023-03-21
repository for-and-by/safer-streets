import React from 'react';
import type {MetaFunction} from '@remix-run/cloudflare';
import {Link} from '@remix-run/react';

import {config} from '~/config';

import Toast from '~/components/regions/toast';
import Header from '~/components/regions/header';
import Footer from '~/components/regions/footer';

export const meta: MetaFunction = () => ({
	title: 'Filters | ' + config.seo.default.title,
	description: config.seo.default.description,
});

export default function Filters() {
	return (
		<>
			<Toast content="Finding results..." show={false}/>
			<Header>
				<div className="flex flex-row items-center bg-white p-2">
					<Link to="/" className="btn btn-light">
						<i className="btn-icon icon icon-arrow-left"/>
					</Link>
					<div className="flex flex-col px-3">
						<h3 className="text-base text-base-700">
							Report Filtering
						</h3>
						<p className="text-sm text-base-400">
							Filter reports to be more specific
						</p>
					</div>
				</div>
			</Header>
			<Footer>
				<div className="flex flex-row items-center bg-white p-2 space-x-2">
					<Link to="/create" className="btn btn-primary w-full">
						<i className="btn-icon icon icon-create"/>
						<p className="btn-text">Create a Report</p>
					</Link>
					<Link to="/filters" className="btn btn-light">
						<i className="btn-icon icon icon-filters"/>
					</Link>
				</div>
			</Footer>
		</>
	);
}
