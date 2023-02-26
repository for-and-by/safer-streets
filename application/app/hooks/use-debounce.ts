import {useState} from 'react';
import {useTimeout} from '~/hooks/use-timeout';

export default function useDebounce<T>(value: T, duration = 500) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useTimeout(
		() => {
			setDebouncedValue(value);
		},
		duration,
		[value]
	);
	
	return debouncedValue;
}
