import clsx from "clsx";

import toast from "~/store/toast/actions";

import useTypedSelector from "~/hooks/use-typed-selector";
import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useDebounce from "~/hooks/use-debounce";

export default function Toast() {
  const dispatch = useTypedDispatch();
  const content = useTypedSelector((state) => state.toast.content);
  const debouncedContent = useDebounce(content, 150);

  const handleClose = () => {
    dispatch(toast.content.clear());
  };

  return (
    <div
      className={clsx(
        "flex items-center space-x-4 rounded bg-base-900 p-4 text-base-50 transition-all",
        content
          ? "opacity-1 pointer-events-auto"
          : "pointer-events-none opacity-0"
      )}
    >
      <i className="icon icon-is-spinning icon-circle-anim z-20 before:text-white" />
      <p className="text-sm">{content ?? debouncedContent}</p>
      <i className="icon icon-close" onClick={handleClose} />
    </div>
  );
}
