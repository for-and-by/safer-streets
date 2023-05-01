import Logo from "~/components/elements/logo";
import { Link, useLocation } from "@remix-run/react";
import type { LinkType } from "~/types/content";
import clsx from "clsx";

const links: LinkType[] = [
  {
    text: "Reports",
    url: "/reports",
  },
  {
    text: "Report Content",
    url: "/content",
  },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="flex h-full w-full flex-col divide-y divide-gray-100">
      <div className="flex gap-4 p-6">
        <Logo />
        <p className="text-gray-500">Dashboard</p>
      </div>

      <div className="flex h-full flex-col items-start gap-4 px-6 py-12">
        {links.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className={clsx(
              "flex items-center gap-2",
              location.pathname.includes(link.url) &&
                "font-medium text-brand-600"
            )}
          >
            <span>{link.text}</span>
            {location.pathname.includes(link.url) ? (
              <i className="h-1 w-1 rounded-full bg-brand-600" />
            ) : null}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 py-4 px-6">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
            <i className="icon icon-account before:text-white" />
          </div>
        </div>
        <div className="flex flex-grow flex-col">
          <p className="text-gray-500">Logged in as</p>
          <p className="truncate font-medium">email@example.com</p>
        </div>
        <Link to="" className="btn btn-light">
          Log Out
        </Link>
      </div>
    </nav>
  );
}
