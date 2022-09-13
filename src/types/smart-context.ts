export type Listener<V> = (value: V) => void;
export type ContextSelector<V, S> = (value: V) => S;

export type ContextValue<V> = {
  value: V;
  registerListener: (listener: Listener<V>) => () => void;
};
