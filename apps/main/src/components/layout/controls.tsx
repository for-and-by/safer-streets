import map from "~/store/map/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";

export default function Controls() {
  const dispatch = useTypedDispatch();

  const handleZoomIn = () => {
    dispatch(map.zoom.in());
  };

  const handleZoomOut = () => {
    dispatch(map.zoom.out());
  };

  return (
    <div className="pointer-events-auto inline-flex flex-col space-y-2 self-end">
      <button className="btn btn-white" onClick={handleZoomIn}>
        <i className="ri-add-fill btn-icon" />
      </button>
      <button className="btn btn-white" onClick={handleZoomOut}>
        <i className="ri-subtract-fill btn-icon" />
      </button>
    </div>
  );
}
