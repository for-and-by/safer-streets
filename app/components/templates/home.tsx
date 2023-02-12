import { Link, useTransition } from "@remix-run/react";
import Header from "~/components/regions/header";
import Bumper from "~/components/elements/bumper";
import Logo from "~/components/elements/logo";
import Footer from "~/components/regions/footer";
import React from "react";

export function HomeTemplate() {
  const { state } = useTransition();
  return (
    <>
      <Header>
        <Bumper
          show={state === "idle"}
          className="flex flex-row items-center bg-white p-2"
        >
          <div className="ml-3 flex-grow">
            <Logo />
          </div>
          <Link to="/search" className="btn btn-light">
            <i className="btn-icon icon icon-search" />
          </Link>
        </Bumper>
      </Header>
      <Footer>
        <Bumper
          show={state === "idle"}
          className="flex flex-row items-center bg-white p-2"
        >
          <Link to="/create" className="btn btn-primary w-full">
            <i className="btn-icon icon icon-pin-add" />
            <p className="btn-text">Create a Report</p>
          </Link>
        </Bumper>
      </Footer>
    </>
  );
}
