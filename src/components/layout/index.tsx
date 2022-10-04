import MapProvider from "~/contexts/map";
import Map from "~/components/map/map";
import Controls from "~/components/layout/controls";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";
import Toast from "~/components/regions/toast";

import TopBar from "~/components/layout/top-bar";
import BottomBar from "~/components/layout/bottom-bar";

import CenterMarker from "~/components/map/markers/center";
import { CreateFormProvider } from "~/contexts/create";
import Reports from "~/components/layout/reports";
import Index from "~/components/views/home";
import Search from "~/components/views/search/search";

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
          <CreateFormProvider>
            <Header.Container />
            <Index />
            <Search />
            <div className="flex flex-grow justify-between overflow-hidden py-4 transition-all">
              <Toast.Container />
              <Controls />
            </div>
            <Footer.Container />
          </CreateFormProvider>
          <BottomBar />
        </div>
      </div>
    </>
  );
}
