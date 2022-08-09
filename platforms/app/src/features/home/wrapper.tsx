import React from "react";

import HomeFooter from "./footer";
import HomeHeader from "./header";

interface Props {
  children?: React.ReactNode;
}

export default function HomeWrapper({ children }: Props) {
  return (
    <>
      <HomeHeader />
      {children}
      <HomeFooter />
    </>
  );
}
