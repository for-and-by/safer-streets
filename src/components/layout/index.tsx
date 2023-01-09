import React from "react";

import MapProvider from "~/contexts/map";
import Map from "~/components/map/map";
import Controls from "~/components/layout/controls";

import Header from "~/components/regions/header";
import Body from "~/components/regions/body";
import Footer from "~/components/regions/footer";
import Toast from "~/components/regions/toast";

import TopBar from "~/components/layout/top-bar";
import BottomBar from "~/components/layout/bottom-bar";

import CenterMarker from "~/components/map/markers/center";
import Reports from "~/components/layout/reports";

import Home from "~/components/views/home";
import Search from "~/components/views/search";
import Create from "~/components/views/create";

export default function Index() {
  return (
    <>
      <Home />
      <Search />
      <Create />
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
          <Header.Container />
          <div className="flex flex-grow justify-between overflow-hidden py-4 transition-all">
            <Toast.Container />
            <Controls />
          </div>
          <Body.Container />
          <Footer.Container />
          <BottomBar />
        </div>
      </div>
    </>
  );
}
