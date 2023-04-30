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
      <p className="flex-grow">{data.text}</p>
      <Link to={data.cta.url}>{data.cta.text}</Link>
    </div>
  );
}
