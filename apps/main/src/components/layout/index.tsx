import MapProvider from "~/components/map/provider";
import Map from "~/components/map/map";
import Controls from "~/components/layout/controls";

import Toast from "~/components/layout/toast";

import TopBar from "~/components/layout/top-bar";
import BottomBar from "~/components/layout/bottom-bar";

import Header from "~/components/layout/headers";
import Footer from "~/components/layout/footers";

import SearchResults from "~/components/search/results";
import CenterMarker from "~/components/map/markers/center";

interface Props {}

export default function Index({}: Props) {
  return (
    <>
      <div className="layer z-10">
        <MapProvider>
          <Map className="absolute inset-0">
            <CenterMarker />
          </Map>
        </MapProvider>
      </div>
      <div className="layer pointer-events-none z-20">
        <div className="clamp mx-auto flex h-full flex-col drop-shadow-lg">
          <TopBar />
          <Header />
          <div className="flex flex-grow justify-between overflow-hidden py-4 transition-all">
            <div className="inline-flex flex-col justify-end">
              <Toast />
            </div>
            <Controls />
          </div>
          <SearchResults />
          <Footer />
          <BottomBar />
        </div>
      </div>
    </>
  );
}
