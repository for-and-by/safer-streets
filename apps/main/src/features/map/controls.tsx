import map from "~/store/map/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Toast from "~/features/layout/toast";

export default function Controls() {
  const dispatch = useTypedDispatch();

  const handleZoomIn = () => {
    dispatch(map.zoom.in());
  };

  const handleZoomOut = () => {
    dispatch(map.zoom.out());
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
