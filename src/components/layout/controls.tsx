import useMapZoom from "~/hooks/map/use-map-zoom";

export default function Controls() {
  const zoom = useMapZoom();

  return (
    <div className="pointer-events-auto inline-flex flex-col space-y-2 self-end">
      <button className="btn btn-white" onClick={zoom.in}>
        <i className="icon icon-plus btn-icon" />
      </button>
      <button className="btn btn-white" onClick={zoom.out}>
        <i className="icon icon-minus btn-icon" />
      </button>
    </div>
  );
}
