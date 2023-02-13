import React, { useEffect } from "react";
import { Link, useTransition } from "@remix-run/react";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";

import Logo from "~/components/atoms/logo";
import useMapLock from "~/hooks/map/use-map-lock";

export function HomeIndexTemplate() {
  const { state } = useTransition();
  const [isLocked, { setUnlock }] = useMapLock();

  useEffect(() => {
    if (isLocked) setUnlock();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        show={state === "idle"}
        className="flex flex-row items-center bg-white p-2"
      >
        <div className="ml-3 flex-grow">
          <Logo />
        </div>
        <Link to="/search" className="btn btn-light">
          <i className="btn-icon icon icon-search" />
        </Link>
      </Header>
      <Footer
        show={state === "idle"}
        className="flex flex-row items-center bg-white p-2"
      >
        <Link to="/create" className="btn btn-primary w-full">
          <i className="btn-icon icon icon-pin-add" />
          <p className="btn-text">Create a Report</p>
        </Link>
      </Footer>
    </>
  );
}
