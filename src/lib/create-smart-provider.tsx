import React from "react";
import { ContextValue } from "~/types/smart-context";

export default function createSmartProvider<V>(
  Provider: React.Provider<ContextValue<V>>
): React.Provider<V> {
  function SmartProvider({ value, children }: React.ProviderProps<V>) {
    type Value = ContextValue<V>["value"]["current"];
    type Listeners = ContextValue<V>["listeners"]["list"];

    const valueRef = React.useRef<Value>(value);
    const listenersRef = React.useRef<Listeners>(new Set());
    const contextValueRef = React.useRef<ContextValue<V>>({
      value: valueRef,
      listeners: {
        list: listenersRef.current,
        register: (listener) => {
          listenersRef.current.add(listener);
          return () => listenersRef.current.delete(listener);
        },
      },
    });

    React.useEffect(() => {
      valueRef.current = value;
      listenersRef.current.forEach((listener) => {
        listener(value);
      });
    }, [value]);

    return <Provider value={contextValueRef.current}>{children}</Provider>;
  }

  return SmartProvider as React.Provider<V>;
}
