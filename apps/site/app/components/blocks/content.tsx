import type { LinkType } from "~/types/content";
import { Link } from "@remix-run/react";

type Props = {
  type: "content";
  data: {
    heading?: string;
    body?: string;
    cta?: LinkType;
  };
};

export function ContentBlock({ data }: Props) {
  return (
    <div className="flex flex-col items-start gap-8 rounded-md bg-white px-8 py-12">
      <div className="flex max-w-xl flex-col gap-2">
        {data?.heading ? (
          <h3 className="text-lg font-medium">{data.heading}</h3>
        ) : null}
        {data?.body ? <p className="text-gray-500">{data.body}</p> : null}
      </div>
      {data.cta ? (
        <Link
          key={data.cta.url}
          to={data.cta.url}
          className="btn btn-light"
          target={data.cta.target}
        >
          {data.cta.text}
        </Link>
      ) : null}
    </div>
  );
}
