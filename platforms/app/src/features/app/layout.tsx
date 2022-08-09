import MapProvider from "~/features/map/provider";
import Map from "~/features/map/map";
import Controls from "~/features/map/controls";
import HomeWrapper from "~/features/home/wrapper";
import SearchWrapper from "~/features/search/wrapper";

import AppHeader from "~/features/app/header";
import AppFooter from "~/features/app/footer";

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
        <div className="clamp mx-auto flex h-full flex-col drop-shadow-lg">
          <AppHeader />
          <HomeWrapper>
            <SearchWrapper>
              <Controls />
            </SearchWrapper>
          </HomeWrapper>
          <AppFooter />
        </div>
      </div>
    </>
  );
}
