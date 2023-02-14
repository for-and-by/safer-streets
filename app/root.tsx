import React from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "~/styles/build.css";
import icons from "~/icons/css/icons.css";
import { Layout } from "~/components/templates/layout";
import type { LoaderFunction } from "@remix-run/router";
import { fetchReports } from "~/lib/supabase";
import { config } from "~/config";

const maplibre = "https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.css";
const fonts =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: config.seo.default.title,
  description: config.seo.default.description,
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: icons },
  { rel: "stylesheet", href: maplibre },
  { rel: "stylesheet", href: fonts },
];

export const loader: LoaderFunction = async () => {
  const reports = await fetchReports();
  return json({
    reports,
  });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
