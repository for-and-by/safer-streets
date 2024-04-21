import { useEffect } from "react";
import { Link } from "@remix-run/react";

import { useMapLock } from "~/hooks/map/use-map-lock";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";

import { Logo } from "~/components/atoms/logo";
import { formatMetadata } from "~/utils/seo";
import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return formatMetadata({
    title: "Home",
  });
};

export default function Home() {
  const [isLocked, { setUnlock }] = useMapLock();

  useEffect(() => {
    if (isLocked) setUnlock();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <div className="flex flex-row items-center bg-white p-2">
          <div className="ml-3 flex-grow">
            <Logo />
          </div>
          <Link to="/search" className="btn btn-light" aria-label="Search">
            <i className="btn-icon icon icon-search" />
          </Link>
        </div>
      </Header>
      <Footer>
        <div className="flex flex-row items-center space-x-2 bg-white p-2">
          <Link to="/create" className="btn btn-primary w-full">
            <i className="btn-icon icon icon-create" />
            <p className="btn-text">Create a Report</p>
          </Link>
        </div>
      </Footer>
    </>
  );
}
