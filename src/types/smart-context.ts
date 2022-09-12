export type Listener<V> = (value: V) => void;
export type UnregisterListener = () => void;
export type ContextSelector<V, S> = (value: V) => S;

export type ContextValue<V> = {
  value: {
    current: V;
  };
  listeners: {
    list: Set<Listener<V>>;
    register: (listener: Listener<V>) => { unregister: UnregisterListener };
  };
};
