import { useMapContext } from '~/contexts/map';

export default function useMap() {
	const { map } = useMapContext();
	return map;
}
