import type { ReactNode } from "react";
import React from "react";

import Toast from "~/components/regions/toast";
import Header from "~/components/regions/header";
import Body from "~/components/regions/body";
import Footer from "~/components/regions/footer";
import Reports from "~/components/regions/reports";

import TopBar from "~/components/molecules/top-bar";
import BottomBar from "~/components/molecules/bottom-bar";
import Controls from "~/components/molecules/controls";

import MapProvider from "~/components/organisms/map/context";
import Map from "~/components/organisms/map";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <MapProvider>
      {children}
      <div className="layer z-10">
        <Map className="absolute inset-0 h-screen w-screen">
          <Reports />
        </Map>
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
    </MapProvider>
  );
}
