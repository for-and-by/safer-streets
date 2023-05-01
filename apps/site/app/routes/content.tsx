import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { json } from "@remix-run/node";

// Content Pages
import * as about from "./content/about.mdx";
import * as changelog from "./content/changelog.mdx";
import * as disclaimer from "./content/disclaimer.mdx";
import * as help from "./content/help.mdx";
import clsx from "clsx";
import type { MouseEventHandler } from "react";
import { useState } from "react";

const pages = [about, changelog, disclaimer, help];

export const loader = async () => {
  return json(
    pages.map((page) => ({
      handle: page.filename.replace(/\.mdx?$/, ""),
      ...page.attributes,
    }))
  );
};

export default function Page() {
  const documents = useLoaderData<typeof loader>();
  const location = useLocation();

  const [showNav, setShowNav] = useState(false);

  const handleShow: MouseEventHandler = () => {
    setShowNav(true);
  };

  const handleHide: MouseEventHandler = () => {
    setShowNav(false);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2">
        <div
          className={clsx(
            "fixed top-0 bottom-0 col-span-1 flex w-[50vw] flex-col items-start gap-8 rounded-md bg-white p-8 pt-16 shadow-2xl",
            "md:static md:w-auto md:translate-x-0 md:shadow-none",
            showNav ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button onClick={handleHide} className="btn btn-light md:hidden">
            <i className="btn-icon icon icon-close" />
          </button>
          <Link to="/" className="flex hidden items-center gap-4 md:block">
            <i className="icon icon-arrow-left before:text-xs" />
            <span>Back Home</span>
          </Link>
          <p className="font-semibold">Documents</p>
          <ul className="flex flex-col items-start gap-2">
            {documents.map((document) => (
              <Link
                key={document.handle}
                to={`/content/${document.handle}`}
                onClick={handleHide}
                className={clsx(
                  "border-b hover:border-gray-200",
                  location.pathname.includes(document.handle)
                    ? "border-brand-600 text-brand-600"
                    : "border-transparent"
                )}
              >
                {document.title}
              </Link>
            ))}
          </ul>
        </div>
        <div className="col-span-4 flex flex-col items-start gap-8 rounded-md bg-white p-8 pt-16 md:col-span-3">
          <div className="prose-h prose prose-h1:text-2xl prose-h1:font-medium prose-h2:font-medium prose-h3:font-medium prose-h4:font-medium">
            <Outlet />
          </div>
          <button onClick={handleShow} className="btn btn-light md:hidden">
            More Documents
          </button>
        </div>
      </div>
    </div>
  );
}
