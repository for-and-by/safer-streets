import React, {useEffect} from 'react';
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData,} from '@remix-run/react';
import type {LinksFunction, LoaderFunction, MetaFunction} from '@remix-run/cloudflare';
import {json} from '@remix-run/cloudflare';

import styles from '~/styles/build.css';
import icons from '~/icons/css/icons.css';

import {config} from '~/config';

import type {Severity, Type} from '~/types/db';
import {fetchReports, fetchSeverities, fetchTypes} from '~/lib/supabase';

import {useFilterStore} from '~/hooks/filter/use-filter-store';

import {Layout} from '~/components/templates/layout';


const maplibre = 'https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.css';
const fonts =
	'https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: config.seo.default.title,
	description: config.seo.default.description,
	viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
	{rel: 'stylesheet', href: styles},
	{rel: 'stylesheet', href: icons},
	{rel: 'stylesheet', href: maplibre},
	{rel: 'stylesheet', href: fonts},
];

export const loader: LoaderFunction = async () => {
	const [reports, types, severities] = await Promise.all([
		await fetchReports(),
		await fetchTypes(),
		await fetchSeverities()
	]);

	return json({
		reports,
		types,
		severities
	});
};

export default function App() {
	const loader = useLoaderData();
	const types = loader.types as Type[];
	const severities = loader.severities as Severity[];

	const {setSeverities, setTypes} = useFilterStore();

	useEffect(() => {
		setSeverities(severities);
		setTypes(types);
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<html lang="en">
		<head>
			<Meta/>
			<Links/>
		</head>
		<body>
		<Layout>
			<Outlet/>
		</Layout>
		<ScrollRestoration/>
		<Scripts/>
		<script
			defer
			data-domain="app.saferstreets.info"
			src={'https://plausible.io/js/script.js'}
		/>
		<LiveReload/>
		</body>
		</html>
	);
}
