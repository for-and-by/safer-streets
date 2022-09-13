import { Provider, createContext } from "react";
import { ContextValue } from "~/types/smart-context";
import createSmartProvider from "~/lib/create-smart-provider";

export default function createSmartContext<V>(initialValue: V) {
  const context = createContext<ContextValue<V>>({
    value: initialValue,
    registerListener: () => () => {},
  });

  //@ts-ignore unused => force delete;
  delete context.Consumer;
  const Provider: Provider<V> = createSmartProvider<V>(context.Provider);
  context.Provider = Provider as any;

  return context;
}
