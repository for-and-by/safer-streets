import { useEffect } from "react";
import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

import "~/styles/index.css";
import "@safer-streets/icons/index.css";

import { config } from "~/config";

import { useFilterStore } from "~/hooks/filter/use-filter-store";

import Map from "~/components/organisms/map";
import MapProvider from "~/components/organisms/map/context";

import Header from "~/components/regions/header";
import Body from "~/components/regions/body";
import Footer from "~/components/regions/footer";
import Reports from "~/components/regions/reports";
import Toast from "~/components/regions/toast";

import TopBar from "~/components/molecules/top-bar";
import BottomBar from "~/components/molecules/bottom-bar";
import Controls from "~/components/molecules/controls";

export function meta() {
  return [
    {
      title: config.seo.default.title,
    },
    {
      name: "description",
      content: config.seo.default.description,
    },
    {
      name: "charset",
      content: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
  ];
}

export function links() {
  return [
    { rel: "stylesheet", href: config.css.maplibre },
    { rel: "stylesheet", href: config.css.fonts },
  ];
}

export async function loader({ context }: LoaderFunctionArgs) {
  const supabase = context.getSupabase();

  const pins = `
    *,
    type:type_handle(
      expire_by, 
      verify_by
    ), 
    content:content_id(
      is_deleted,
      verified_at
    )
  `;

  const [reports, types, severities] = await Promise.all([
    await supabase.from("reports").select(pins),
    await supabase.from("types").select().eq('is_enabled', true),
    await supabase.from("severities").select(),
  ]);

  return json({
    reports: reports.data,
    types: types.data,
    severities: severities.data,
  });
}

export default function App() {
  const { types, severities } = useLoaderData<typeof loader>();
  const { setSeverities, setTypes } = useFilterStore();

  useEffect(() => {
    setSeverities(severities);
    setTypes(types);
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MapProvider>
          <Outlet />
          <div className="layer z-10">
            <Map className="absolute inset-0 h-screen w-screen">
              <Reports />
            </Map>
          </div>
          <div className="layer pointer-events-none z-20">
            <div className="clamp mx-auto flex h-full flex-col drop-shadow-lg">
              <TopBar />
              <Header.Container />
              <div className="flex flex-grow justify-between overflow-hidden py-4 transition-all">
                <Toast.Container />
                <Controls />
              </div>
              <Body.Container />
              <Footer.Container />
              <BottomBar />
            </div>
          </div>
        </MapProvider>
        <Scripts />
        <script
          defer
          data-domain="app.saferstreets.info"
          src={"https://plausible.io/js/script.js"}
        />
      </body>
    </html>
  );
}
