import React from "react";
import useFindSelf from "~/hooks/use-find-self";
import Toast from "~/components/composites/toast";
import useMapCenter from "~/hooks/map/use-map-center";

interface Props {
  onFound?: () => void;
}

export default function FindSelfButton({ onFound = () => {} }: Props) {
  const findSelf = useFindSelf();
  const center = useMapCenter();

  React.useEffect(() => {
    if (findSelf.coords) {
      center.set(findSelf.coords);
      onFound();
    }
  }, [findSelf.loading]);

  const handleFindSelf = () => {
    findSelf.run();
  };

  return (
    <>
      <Toast show={findSelf.loading} content="Finding your location..." />
      <button className="btn btn-primary" onClick={handleFindSelf}>
        <i className="btn-icon icon icon-find-self" />
      </button>
    </>
  );
}
