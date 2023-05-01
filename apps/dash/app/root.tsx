import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "@safer-streets/tailwind/index.css";
import icons from "@safer-streets/icons/index.css";

import { config } from "~/config";

import NoMobileScreen from "~/components/globals/no-mobile-screen";

export function meta() {
  return {
    charset: "utf-8",
    title: config.seo.default.title,
    description: config.seo.default.description,
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: icons },
    { rel: "stylesheet", href: config.css.fonts },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <NoMobileScreen />
      </body>
    </html>
  );
}
