import MapProvider from "~/features/map/provider";
import Map from "~/features/map/map";
import Controls from "~/features/map/controls";
import HomeHeader from "~/features/home/header";
import HomeFooter from "~/features/home/footer";

interface Props {}

export default function Layout({}: Props) {
  return (
    <>
      <div className="layer z-10">
        <MapProvider>
          <Map className="absolute inset-0"></Map>
        </MapProvider>
      </div>
      <div className="layer pointer-events-none z-20">
        <div className="clamp mx-auto p-4">
          <HomeHeader />
          <Controls />
          <HomeFooter />
        </div>
      </div>
    </>
  );
}
