import React from "react";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import AboutIndexTemplate from "~/components/templates/about";
import { formatMetadata } from "~/utils/seo";

export const meta: MetaFunction = () => {
  return formatMetadata({
    title: "About",
  });
};

export default function About() {
  return (
    <AboutIndexTemplate>
      <Outlet />
    </AboutIndexTemplate>
  );
}
