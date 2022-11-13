import React from 'react';

import { VIEWS } from '~/hooks/view/use-view-store';
import useView from '~/hooks/view/use-view';
import useViewIsActive from '~/hooks/view/use-view-is-active';

import Header from '~/components/regions/header';
import Footer from '~/components/regions/footer';

import Logo from '~/components/elements/logo';
import Bumper from '~/components/elements/bumper';

export default function Home() {
	const [view, setView] = useView();
	const isHomeActive = useViewIsActive(VIEWS.HOME);

	const handleShowSearch = () => setView(VIEWS.SEARCH);
	const handleShowCreate = () => setView(VIEWS.CREATE);

	return (
		<>
			<Header>
				<Bumper
					show={isHomeActive}
					className="flex flex-row items-center bg-white p-2"
				>
					<div className="ml-3 flex-grow">
						<Logo />
					</div>
					<button className="btn btn-light" onClick={handleShowSearch}>
						<i className="btn-icon icon icon-search" />
					</button>
				</Bumper>
			</Header>
			<Footer>
				<Bumper
					show={isHomeActive}
					className="flex flex-row items-center bg-white p-2"
				>
					<button className="btn btn-primary w-full" onClick={handleShowCreate}>
						<i className="btn-icon icon icon-pin-add" />
						<p className="btn-text">Create a Report</p>
					</button>
				</Bumper>
			</Footer>
		</>
	);
}
