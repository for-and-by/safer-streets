import { useMapContext } from '~/contexts/map';

export default function useMapRef() {
	const { ref } = useMapContext();
	return ref;
}
