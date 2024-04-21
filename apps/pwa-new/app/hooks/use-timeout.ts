import { useEffect } from "react";

export function useTimeout(
  callback: () => void,
  duration: number,
  deps: any[]
) {
  useEffect(() => {
    const timeout = setTimeout(callback, duration);
    return () => {
      clearTimeout(timeout);
    };
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, duration, ...deps]);
}
