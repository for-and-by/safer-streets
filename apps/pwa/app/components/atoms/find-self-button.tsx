import React, { useState } from "react";
import Toast from "~/components/regions/toast";
import useMapCenter from "~/hooks/map/use-map-center";

interface Props {
  onFound?: () => void;
}

export default function FindSelfButton({ onFound }: Props) {
  const [loading, setLoading] = useState(false);
  const [, setCenter] = useMapCenter();

  function handleFindSelf() {
    if (navigator && "geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const { longitude, latitude } = success.coords;
          setCenter([longitude, latitude]);
          setLoading(false);
          if (onFound) onFound();
        },
        (error) => {
          throw new Error(error.message);
        }
      );
    } else {
      throw new Error("Geolocation not available on this browser.");
    }
  }

  return (
    <>
      <Toast show={loading} content="Finding your location..." />
      <button className="btn btn-primary" onClick={handleFindSelf}>
        <i className="btn-icon icon icon-find-self" />
      </button>
    </>
  );
}
