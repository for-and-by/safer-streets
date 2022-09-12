import React from "react";
import { ContextValue, Listener } from "~/types/smart-context";
import createSmartProvider from "~/lib/create-smart-provider";

function wrapInitialValue<T>(initialValue: T): ContextValue<T> {
  return {
    value: {
      current: initialValue,
    },
    listeners: {
      list: new Set<Listener<T>>(),
      register: () => ({
        unregister: () => {},
      }),
    },
  };
}

export default function createSmartContext<V = any>(initialValue: V) {
  const value = wrapInitialValue(initialValue);
  const context = React.createContext(value);

  //@ts-ignore unused => force delete;
  delete context.Consumer;
  const Provider: React.Provider<V> = createSmartProvider(context.Provider);
  context.Provider = Provider as any;

  return context;
}
