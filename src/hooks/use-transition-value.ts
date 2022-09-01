import useDebounce from "~/hooks/use-debounce";

// A small utility hook to hold a value over for transition purposes.
// Updates instantly, but will hold the value for duration when made null;

export default function useTransitionValue<T>(value: T, duration?: number) {
  const debouncedValue = useDebounce(value, duration);
  const isTruthyValue = Array.isArray(value) ? value.length > 0 : !!value;
  return isTruthyValue ? value : debouncedValue;
}
