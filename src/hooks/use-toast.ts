import useTypedDispatch from "~/hooks/use-typed-dispatch";
import toast from "~/store/toast/actions";

export default function useToast() {
  const dispatch = useTypedDispatch();

  return {
    set: (content: string) => dispatch(toast.content.set(content)),
    clear: () => dispatch(toast.content.clear()),
  };
}
