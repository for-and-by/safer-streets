import { Link } from "@remix-run/react";

import type { LinkType } from "~/types/content";
import clsx from "clsx";
import { SimpleMap } from "~/components/elements/map";

export type Props = {
  type: "hero";
  data: {
    heading?: string;
    subheading?: string;
    ctas?: LinkType[];
  };
};

export function HeroBlock({ data }: Props) {
  return (
    <div className="relative flex flex-col items-start gap-8 px-8 py-24">
      <div className="absolute inset-0 -z-10">
        <SimpleMap />
      </div>

      <div className="flex flex-col gap-2">
        {data?.heading ? (
          <h1 className="text-2xl font-medium">{data.heading}</h1>
        ) : null}
        {data?.subheading ? <p>{data.subheading}</p> : null}
      </div>
      {data?.ctas ? (
        <div className="flex gap-4">
          {data.ctas.map((cta, index) => (
            <Link
              key={cta.url}
              to={cta.url}
              className={clsx("btn", index === 0 ? "btn-primary" : "btn-light")}
              target={cta.target}
            >
              {cta.text}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
