import MapProvider from "~/contexts/map";
import Map from "~/components/map/map";
import Controls from "~/components/layout/controls";

import Toast from "~/components/composites/toast";

import TopBar from "~/components/layout/top-bar";
import BottomBar from "~/components/layout/bottom-bar";

import Header from "~/components/layout/header";
import Footer from "~/components/layout/footer";

import SearchResults from "~/components/layout/search/results";
import CenterMarker from "~/components/map/markers/center";
import { SearchProvider } from "~/contexts/search";
import { CreateFormProvider } from "~/contexts/create";
import Reports from "~/components/layout/reports";

interface Props {}

export default function Index({}: Props) {
  return (
    <>
      <div className="layer z-10">
        <MapProvider>
          <Map className="absolute inset-0">
            <Reports />
            <CenterMarker />
          </Map>
        </MapProvider>
      </div>
      <div className="layer pointer-events-none z-20">
        <div className="clamp mx-auto flex h-full flex-col drop-shadow-lg">
          <TopBar />
          <SearchProvider>
            <CreateFormProvider>
              <Header />
              <div className="flex flex-grow justify-between overflow-hidden py-4 transition-all">
                <Toast.Container />
                <Controls />
              </div>
              <SearchResults />
              <Footer />
            </CreateFormProvider>
          </SearchProvider>
          <BottomBar />
        </div>
      </div>
    </>
  );
}
