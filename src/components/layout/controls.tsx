import useMapDispatch from "~/hooks/use-map-dispatch";

export default function Controls() {
  const map = useMapDispatch();

  const handleZoomIn = () => {
    map.zoom.in();
  };

  const handleZoomOut = () => {
    map.zoom.out();
  };

  return (
    <div className="pointer-events-auto inline-flex flex-col space-y-2 self-end">
      <button className="btn btn-white" onClick={handleZoomIn}>
        <i className="icon icon-plus btn-icon" />
      </button>
      <button className="btn btn-white" onClick={handleZoomOut}>
        <i className="icon icon-minus btn-icon" />
      </button>
    </div>
  );
}
