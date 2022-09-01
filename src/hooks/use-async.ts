import React from "react";

export default function useAsync<T, V>(
  callback: () => Promise<T>,
  deps: any[]
) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<T | undefined>(undefined);
  const [error, setError] = React.useState<V | undefined>(undefined);

  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    setLoading(true);

    callbackRef
      .current()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [...deps]);

  return { loading, data, error };
}
