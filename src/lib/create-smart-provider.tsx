import { Provider, ProviderProps, useRef, useEffect } from "react";

import { ContextValue, Listener } from "~/types/smart-context";

export default function createSmartProvider<V>(
  Provider: Provider<ContextValue<V>>
): Provider<V> {
  function SmartProvider({ value, children }: ProviderProps<V>) {
    const valueRef = useRef<V>(value);
    const listenersRef = useRef<Set<Listener<V>>>(new Set());
    const contextValueRef = useRef<ContextValue<V>>({
      value: valueRef.current,
      registerListener: (listener) => {
        listenersRef.current.add(listener);
        return () => listenersRef.current.delete(listener);
      },
    });

    useEffect(() => {
      valueRef.current = value;
      listenersRef.current.forEach((listener: Listener<V>) => {
        listener(value);
      });
    }, [value]);

    return <Provider value={contextValueRef.current}>{children}</Provider>;
  }

  return SmartProvider as Provider<V>;
}
