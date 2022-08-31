import React from "react";

export default function useTimeout(
  callback: () => void,
  duration: number,
  deps: any[]
) {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (!duration && duration !== 0) return;
    const timeout = setTimeout(callback, duration);
    return () => clearTimeout(timeout);
  }, [duration, ...deps]);
}
