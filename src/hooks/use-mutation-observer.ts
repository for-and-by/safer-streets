import { useEffect, useRef } from "react";

export default function useMutationObserver(
  callback: MutationCallback,
  target?: Element
) {
  const observerRef = useRef<MutationObserver | undefined>(undefined);
  const callbackRef = useRef<typeof callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    observerRef.current = new MutationObserver(callbackRef.current);

    if (target) {
      observerRef.current?.observe(target, {
        childList: true,
        attributes: true,
        subtree: true,
      });
      return () => {
        observerRef.current?.disconnect();
      };
    }
  }, [target]);
}
