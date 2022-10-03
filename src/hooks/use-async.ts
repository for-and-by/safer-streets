import { useEffect, useRef } from "react";

export default function useAsync<Data, Error>(
  callback: () => Promise<Data>,
  deps: any[]
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = React.useState<Data | undefined>(undefined);
  const [error, setError] = React.useState<Error | undefined>(undefined);

  const callbackRef = useRef<typeof callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  async function run() {
    setLoading(true);
    callbackRef
      .current()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  return { loading, data, error, run };
}
