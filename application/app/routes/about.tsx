import React from "react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

import { config } from "~/config";

import AboutIndexTemplate from "~/components/templates/about";

export const meta: MetaFunction = () => ({
  title: "About | " + config.seo.default.title,
  description: config.seo.default.description,
});

export default function About() {
  return (
    <AboutIndexTemplate>
      <Outlet />
    </AboutIndexTemplate>
  );
}
