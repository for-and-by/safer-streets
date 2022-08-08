import clsx from "clsx";

import { useTypedDispatch, useTypedSelector } from "~/features/store/hooks";
import { hideToast } from "~/features/store/store";

import Loader from "~/features/ui/loader";

export default function Toast() {
  const dispatch = useTypedDispatch();
  const toast = useTypedSelector((state) => state.toast.content);
  const show = useTypedSelector((state) => state.toast.show);

  const handleClose = () => {
    dispatch(hideToast());
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
      <p className="pr-2 text-sm">{toast}</p>
      <div className="pr-2 text-sm" onClick={handleClose}>
        <i className="icon-sm ri-close-fill" />
      </div>
    </div>
  );
}
