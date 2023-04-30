import { Link } from "@remix-run/react";

import type { LinkType } from "~/types/content";
import clsx from "clsx";

type Props = {
  type: "hero";
  data: {
    heading?: string;
    subheading?: string;
    ctas?: LinkType[];
  };
};

export function HeroBlock({ data }: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex w-full flex-col items-start gap-8 px-8 py-24">
        <div className="flex flex-col gap-2">
          {data?.heading ? (
            <h1 className="text-2xl font-semibold">{data.heading}</h1>
          ) : null}
          {data?.subheading ? (
            <p className="text-gray-500">{data.subheading}</p>
          ) : null}
        </div>
        {data?.ctas ? (
          <div className="flex gap-4">
            {data.ctas.map((cta, index) => (
              <Link
                key={cta.url}
                to={cta.url}
                className={clsx(
                  "btn",
                  index === 0 ? "btn-primary" : "btn-white"
                )}
                target={cta.target}
              >
                {cta.text}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <div className="hidden w-full flex-col overflow-hidden rounded-md border-2 border-white md:flex">
        <div className="flex items-center gap-1 bg-white p-2">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
        </div>
        <img
          src="/map.png"
          alt="Safer Streets Map - Simple"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
