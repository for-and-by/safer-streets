import { useCallback, useState } from "react";

type UseAsyncActionProps<Data, Error, Args extends any[]> = {
  action: (...args: Args) => Promise<Data>;
  onSuccess?: (data: Data) => void;
  onError?: (error: Error) => void;
  onEnd?: () => void;
};

export function useAsyncAction<Data, Error, Args extends any[]>(
  props: UseAsyncActionProps<Data, Error, Args>
) {
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleAsyncAction = useCallback((...args: Args) => {
    setIsLoading(true);
    props
      .action(...args)
      .then((data) => {
        props?.onSuccess?.(data);
      })
      .catch((error) => {
        props?.onError?.(error);
      })
      .finally(() => {
        props?.onEnd?.();
        setIsLoading(false);
      });

    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, handleAsyncAction };
}
