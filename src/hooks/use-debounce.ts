import React from "react";
import useTimeout from "~/hooks/use-timeout";

export default function useDebounce<T>(value: T, duration: number = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useTimeout(
    {
      onEnd: () => {
        setDebouncedValue(value);
      },
      duration,
    },
    [value]
  );

  return debouncedValue;
}
