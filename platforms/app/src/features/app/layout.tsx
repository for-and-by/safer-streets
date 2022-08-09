import MapProvider from "~/features/map/provider";
import Map from "~/features/map/map";
import Controls from "~/features/map/controls";
import AppHeader from "~/features/app/header";
import HomeWrapper from "~/features/home/wrapper";
import SearchWrapper from "~/features/search/wrapper";

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
          <HomeWrapper>
            <SearchWrapper>
              <Controls />
            </SearchWrapper>
          </HomeWrapper>
        </div>
      </div>
    </>
  );
}
