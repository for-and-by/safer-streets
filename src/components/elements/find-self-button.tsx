import React, { useEffect } from 'react';
import useFindSelf from '~/hooks/use-find-self';
import Toast from '~/components/regions/toast';
import useMapCenter from '~/hooks/map/use-map-center';

interface Props {
  onFound?: () => void;
}

export default function FindSelfButton({ onFound }: Props) {
	const { isLoading, run, coords } = useFindSelf();
	const [, setCenter] = useMapCenter();

	useEffect(() => {
		if (coords) {
			setCenter(coords);
			if(onFound) onFound();
		}
	}, [isLoading]);

	const handleFindSelf = () => {
		run();
	};

	return (
		<>
			<Toast show={isLoading} content="Finding your location..." />
			<button className="btn btn-primary" onClick={handleFindSelf}>
				<i className="btn-icon icon icon-find-self" />
			</button>
		</>
	);
}
