import clsx from "clsx";

import toast from "~/store/toast/actions";

import useTypedSelector from "~/hooks/use-typed-selector";
import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Loader from "~/components/elements/loader";

export default function Toast() {
  const dispatch = useTypedDispatch();
  const content = useTypedSelector((state) => state.toast.content);
  const show = useTypedSelector((state) => state.toast.show);

  const handleClose = () => {
    dispatch(toast.hide());
  };

  return (
    <div
      className={clsx(
        "flex items-center space-x-1 rounded bg-base-900 text-base-50 transition-all",
        show
          ? "opacity-1 pointer-events-auto"
          : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <div className="p-4">
        <Loader className="h-4 w-4 stroke-base-50" />
      </div>
      <p className="pr-2 text-sm">{content}</p>
      <div className="pr-2 text-sm" onClick={handleClose}>
        <i className="icon-sm ri-close-fill" />
      </div>
    </div>
  );
}
