import React, {useEffect} from 'react';
import {Link} from '@remix-run/react';

import {config} from '~/config';

import useMapLock from '~/hooks/map/use-map-lock';

import Header from '~/components/regions/header';
import Footer from '~/components/regions/footer';

import Logo from '~/components/atoms/logo';

export function meta() {
	return {
		title: 'Home | ' + config.seo.default.title,
		description: config.seo.default.description,
	};
}

export default function Home() {
	const [isLocked, {setUnlock}] = useMapLock();

	useEffect(() => {
		if (isLocked) setUnlock();
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header>
				<div className="flex flex-row items-center bg-white p-2">
					<div className="ml-3 flex-grow">
						<Logo/>
					</div>
					<Link to="/search" className="btn btn-light">
						<i className="btn-icon icon icon-search"/>
					</Link>
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
