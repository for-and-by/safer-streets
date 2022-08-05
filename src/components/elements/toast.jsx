import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import { clearToast } from "~/store/toast";
import Loader from "./loader";

// Component

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast.currentToast);

  const handleClose = () => {
    dispatch(clearToast());
  };

  return (
    <div
      className={clsx(
        "flex items-center space-x-1 rounded bg-base-900 text-base-50 transition-all",
        toast
          ? "opacity-1 pointer-events-auto"
          : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <div className="p-4">
        <Loader className="h-4 w-4 stroke-base-50" />
      </div>
      <p className="pr-2 text-sm">{toast}</p>
      <div
        className="pr-2 text-sm"
        onClick={handleClose}
      >
        <i className="icon-sm ri-close-fill" />
      </div>
    </div>
  );
};

Toast.propTypes = {};

Toast.defaultProps = {};

export default Toast;
