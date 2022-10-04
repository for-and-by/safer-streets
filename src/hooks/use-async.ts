import { useCallback, useEffect, useRef, useState } from "react";

interface Options {
  deps?: any[];
  immediate?: boolean;
}

const defaultOptions: Options = {
  immediate: false,
};

export default function useAsync<Data, Error>(
  callback: () => Promise<Data>,
  options: Options = defaultOptions
) {
  const { immediate } = options;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const callbackRef = useRef<typeof callback>(callback);

  const trigger = useCallback(() => {
    setIsLoading(true);
    callbackRef
      .current()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (immediate) {
      trigger();
    }
  }, []);

  return { isLoading, data, error, trigger };
}
