import React from "react";
import { ContextSelector, ContextValue, Listener } from "~/types/smart-context";

export default function useSmartContext<V, S>(
  context: React.Context<ContextValue<V>>,
  selector: ContextSelector<V, S>
) {
  const { value, listeners } = React.useContext<ContextValue<V>>(context);
  const selectorRef = React.useRef<ContextSelector<V, S>>(selector);
  const [selectedValue, setSelectedValue] = React.useState<S>(() =>
    selector(value.current)
  );

  React.useEffect(() => {
    selectorRef.current = selector;
  });

  React.useEffect(() => {
    const listener: Listener<V> = (newValue) => {
      const newSelectedValue: S = selectorRef.current(newValue);
      setSelectedValue(newSelectedValue);
    };

    const { unregister } = listeners.register(listener);
    return unregister;
  }, [selector, selectedValue, value]);

  return selectedValue;
}
