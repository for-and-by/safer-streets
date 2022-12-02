import React from 'react';

interface Options {
  onStart?: () => void;
  onEnd?: () => void;
  duration?: number;
}

export default function useTimeout(options: Options, deps: any[]) {
	const { onStart = () => {}, onEnd = () => {}, duration = 500 } = options;

	const onStartRef = React.useRef(onStart);
	const onEndRef = React.useRef(onEnd);

	React.useEffect(() => {
		onStartRef.current = onStart;
	}, [onStart]);

	React.useEffect(() => {
		onEndRef.current = onEnd;
	}, [onStart]);

	React.useEffect(() => {
		if (!duration && duration !== 0) return;
		onStartRef.current();
		const timeout = setTimeout(() => {
			onEndRef.current();
		}, duration);

		return () => {
			clearTimeout(timeout);
		};
	}, [duration, ...deps]);
}
