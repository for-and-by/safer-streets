import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/cloudflare";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";

import { formatMetadata } from "~/utils/seo";


export const meta: MetaFunction = () => {
  return formatMetadata({
    title: "About",
  });
};

export default function About() {
  return (
    <>
      <Header>
        <div className="flex flex-row items-center bg-white p-2">
          <Link to="/" className="btn btn-light">
            <i className="btn-icon icon icon-arrow-left" />
          </Link>
          <div className="ml-3 flex-grow">
            About <b>Safer Streets</b>
          </div>
        </div>
      </Header>
      <Footer>
        <div className="p-4 flex flex-col gap-2">
          <b>Formerly known as <em>Floodwatch</em>, Safer Streets is a community managed hazard reporting platform.</b>
          <p>Built for the Feb 2022 Brisbane floods, the intention of the platform is to create a consolidated map of community submitted images and details, both to report to other community members, and to document events over time.</p>
          <p>No data of yours is collected outside of standard traffic analytics, and all posts can be edited or updated by anyone using the site - no questions asked.</p>
          <p>If you are having any issues, please send me an email at <a href="mailto:info@jtaccinelli.com.au" className="underline">info@jtaccinelli.com.au</a> </p>
        </div>
      </Footer>
    </>
  );
}
