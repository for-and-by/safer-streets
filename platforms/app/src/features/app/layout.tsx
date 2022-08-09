import MapProvider from "~/features/map/provider";
import Map from "~/features/map/map";
import Controls from "~/features/map/controls";
import HomeHeader from "~/features/home/header";
import HomeFooter from "~/features/home/footer";
import AppHeader from "~/features/app/header";
import SearchHeader from "~/features/search/header";
import SearchFooter from "~/features/search/footer";

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
        <div className="clamp mx-auto flex h-full flex-col">
          <AppHeader />
          <SearchHeader />
          <HomeHeader />
          <Controls />
          <SearchFooter />
          <HomeFooter />
        </div>
      </div>
    </>
  );
}
