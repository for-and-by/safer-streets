import { useEffect, useRef } from 'react';

export default function useResizeObserver(
	target?: Element,
	callback?: (value: ResizeObserverSize) => void
) {
	const observerRef = useRef<ResizeObserver | undefined>(undefined);
	const callbackRef = useRef<typeof callback>(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		observerRef.current = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.contentBoxSize) {
					const contentBoxSize = Array.isArray(entry.contentBoxSize)
						? entry.contentBoxSize[0]
						: entry.contentBoxSize;

					callbackRef?.current?.(contentBoxSize);
				}
			}
		});

		if (target) {
			observerRef.current?.observe(target);
			return () => {
				observerRef.current?.unobserve(target);
			};
		}
	}, []);
}
