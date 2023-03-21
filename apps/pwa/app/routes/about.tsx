import type { ReactNode } from "react";
import React, { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link, useLocation } from "@remix-run/react";

import { formatMetadata } from "~/utils/seo";

import useMapLock from "~/hooks/map/use-map-lock";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";

interface Props {
  children: ReactNode;
}

const ABOUT_LINKS = {
  About: "/about",
  Contact: "/about/contact",
  Help: "/about/help",
  Disclaimer: "/about/disclaimer",
} as const;

export const meta: MetaFunction = () => {
  return formatMetadata({
    title: "About",
  });
};

export default function About({ children }: Props) {
  const [isLocked, { setLock }] = useMapLock();
  const location = useLocation();

  useEffect(() => {
    if (isLocked) setLock();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <div className="flex flex-row items-center bg-white p-2">
          <Link to="/" className="btn btn-light">
            <i className="btn-icon icon icon-arrow-left" />
          </Link>
          <div className="flex flex-col px-3">
            <h3 className="font-medium">About Safer Streets</h3>
          </div>
        </div>
      </Header>
      <Footer>
        <div className="max-h-[50vh] divide-y divide-gray-100 overflow-y-scroll bg-white">
          <div className="sticky top-0 z-20 flex h-16 w-full flex-row space-x-4 bg-white px-4">
            {Object.keys(ABOUT_LINKS).map((key) => {
              const link = ABOUT_LINKS[key as keyof typeof ABOUT_LINKS];
              const isActive = link === location.pathname;
              return (
                <Link
                  key={key}
                  to={link}
                  className="flex items-center border-b border-white capitalize hover:border-gray-200 d-active:border-brand-600"
                  {...(isActive ? { "data-active": true } : {})}
                >
                  {key}
                </Link>
              );
            })}
          </div>
          <div className="prose flex max-w-none flex-col space-y-4 p-3 child:m-0">
            {children}
          </div>
        </div>
      </Footer>
    </>
  );
}
