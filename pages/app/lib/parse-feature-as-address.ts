import type { SearchResult } from '~/types/search';

export default function parseFeatureAsAddress(feature: SearchResult) {
	return [feature?.address ?? null, feature?.text ?? null]
		.filter((i) => !!i)
		.join(' ');
}
