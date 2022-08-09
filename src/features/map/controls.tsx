import { useTypedDispatch } from "~/features/store/hooks";
import { zoomIn, zoomOut } from "~/features/map/store";
import Toast from "~/features/toast/toast";

// import Toast from "~/components/elements/toast";

export default function Controls() {
  const dispatch = useTypedDispatch();

  const handleZoomIn = () => {
    dispatch(zoomIn());
  };

  const handleZoomOut = () => {
    dispatch(zoomOut());
  };

  return (
    <div className="flex flex-grow justify-between overflow-hidden py-4 transition-all">
      <div className="inline-flex flex-col justify-end">
        <Toast />
      </div>
      <div className="pointer-events-auto inline-flex flex-col space-y-2 self-end">
        <button className="btn btn-white" onClick={handleZoomIn}>
          <i className="ri-add-fill btn-icon" />
        </button>
        <button className="btn btn-white" onClick={handleZoomOut}>
          <i className="ri-subtract-fill btn-icon" />
        </button>
      </div>
    </div>
  );
}
