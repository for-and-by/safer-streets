import type { LinkType } from "~/types/content";
import clsx from "clsx";
import { Link } from "@remix-run/react";

type Props = {
  type: "banner";
  data: {
    icon?: string;
    text: string;
    cta: LinkType;
  };
};

export function BannerBlock({ data }: Props) {
  return (
    <div className="flex flex-row items-center gap-4 rounded-md bg-gray-900 p-4 text-white">
      <i className={clsx("icon before:text-brand-600", data?.icon)} />
      <p className="flex-grow truncate">{data.text}</p>
      <Link
        className="flex items-center gap-2 whitespace-nowrap"
        to={data.cta.url}
      >
        <span className="hidden md:block">{data.cta.text}</span>
        <i className="icon icon-arrow-right before:text-xs" />
      </Link>
    </div>
  );
}
