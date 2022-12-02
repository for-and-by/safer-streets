import { useGeocoderStore } from '~/hooks/geocoder/use-geocoder-store';

export default function useGeocoderResults() {
	const results = useGeocoderStore((state) => state.results);
	const fetchResults = useGeocoderStore((state) => state.fetchResults);
	const clearResults = useGeocoderStore((state) => state.clearResults);
	const isLoading = useGeocoderStore((state) => state.isLoading);

	const values = {
		results,
		isLoading,
		isEmpty: results?.length === 0,
		resultsCount: results?.length ?? 0,
	};

	const actions = {
		fetchResults,
		clearResults,
	};

	return [values, actions] as [typeof values, typeof actions];
}
