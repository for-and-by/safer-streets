import React from "react";
import type { MetaFunction } from "@remix-run/cloudflare";

import { config } from "~/config";

import HomeIndexTemplate from "~/components/templates/home";

export const meta: MetaFunction = () => ({
  title: "Home | " + config.seo.default.title,
  description: config.seo.default.description,
});

export default function Home() {
  return <HomeIndexTemplate />;
}
