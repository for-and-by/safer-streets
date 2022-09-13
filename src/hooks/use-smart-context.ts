import { Context, useContext, useRef, useState, useEffect } from "react";
import { ContextSelector, ContextValue, Listener } from "~/types/smart-context";

export default function useSmartContext<V, S>(
  context: Context<ContextValue<V>>,
  selector: ContextSelector<V, S>
) {
  const { value, registerListener } = useContext<ContextValue<V>>(context);

  const selectorRef = useRef<ContextSelector<V, S>>(selector);
  const [selectedValue, setSelectedValue] = useState<S>(() => selector(value));

  if (!context) {
    throw new Error(
      `This hook or component needs to be used within its context`
    );
  }

  useEffect(() => {
    selectorRef.current = selector;
  });

  useEffect(() => {
    const listener: Listener<V> = (newValue) => {
      const newSelectedValue: S = selectorRef.current(newValue);
      setSelectedValue(newSelectedValue);
    };

    const unregister = registerListener(listener);

    return unregister;
  }, [selector, selectedValue, value]);

  return selectedValue;
}
