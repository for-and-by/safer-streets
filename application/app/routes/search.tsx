import React, {useState} from 'react';
import type {LoaderArgs} from '@remix-run/cloudflare';
import {json} from '@remix-run/cloudflare';
import {Link, useActionData, useNavigate, useSubmit, useTransition} from '@remix-run/react';

import {config} from '~/config';
import {geocode} from '~/lib/maplibre';

import {useTimeout} from '~/hooks/use-timeout';

import Toast from '~/components/regions/toast';
import Header from '~/components/regions/header';
import Body from '~/components/regions/body';
import Footer from '~/components/regions/footer';

import FindSelfButton from '~/components/atoms/find-self-button';
import Bumper from '~/components/atoms/bumper';

import SearchResults from '~/components/molecules/search-results';
import Text from '~/components/inputs/text';

export function meta() {
	return {
		title: 'Search | ' + config.seo.default.title,
		description: config.seo.default.description,
	};
}

export async function action({request}: LoaderArgs) {
	const data = await request.formData();

	const query = data.get('query');
	const lng = data.get('lng');
	const lat = data.get('lat');

	const hasQuery = query && typeof query === 'string';
	const hasLngLat = lng && lat && typeof lng === 'string' && typeof lat === 'string';

	const features = hasQuery ?
		await geocode(query) :
		hasLngLat ?
			await geocode([parseFloat(lng), parseFloat(lat)]) :
			[];

	return json({
		results: features,
		resultsCount: features.length,
		isEmpty: features.length === 0,
	});
}

export default function Search() {
	const {state} = useTransition();
	const search = useActionData<typeof action>();

	const navigate = useNavigate();
	const submit = useSubmit();

	const [value, setValue] = useState<string>('');

	useTimeout(() => {
		submit({query: value}, {method: 'post', action: '/search'});
	}, 400, [value]);

	const hasNoResults = !search || search.isEmpty;

	return (
		<>
			<Toast content="Finding results..." show={state === 'submitting'}/>
			<Header>
				<div className="flex flex-row items-center bg-white p-2">
					<Link to="/" className="btn btn-light">
						<i className="btn-icon icon icon-arrow-left"/>
					</Link>
					<div className="flex flex-col px-3">
						<h3 className="text-base text-base-700">
							{hasNoResults ? 'No' : search.resultsCount} results found
						</h3>
						<p className="text-sm text-base-400">
							{hasNoResults ? 'Start by typing in an address.' : 'Select a location to jump to.'}
						</p>
					</div>
				</div>
			</Header>
			<Body>
				<Bumper show={!search?.isEmpty}>
					<SearchResults results={search?.results}/>
				</Bumper>
			</Body>
			<Footer>
				<div className="flex flex-row items-center space-x-2 bg-white p-2">
					<Text
						value={value}
						onChange={(event) => setValue(event.target.value)}
						icon="icon-search"
						placeholder="Search for an address..."
					/>
					<FindSelfButton onFound={() => navigate('/')}/>
				</div>
			</Footer>
		</>
	);
}
