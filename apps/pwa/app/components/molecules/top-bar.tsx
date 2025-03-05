import { Link } from "@remix-run/react";

export default function TopBar() {
  return (
    <div className="pointer-events-auto flex w-full flex-row bg-base-100">
      <div className="flex flex-grow flex-row space-x-4 py-1 px-2">
        <Link
          to="https://www.abc.net.au/news/2025-03-05/tropical-cyclone-alfred-brisbane-forecast-queensland-nsw-live/105010498"
          className="text-sm text-base-900"
        >
          Keep updated on <span className="text-sm underline">Cyclone Alfred</span>
        </Link>
      </div>
      <Link
        to="/about"
        className="flex h-full items-center px-2"
        aria-label="About Safer Streets"
      >
        <i className="icon icon-info icon-sm before:text-brand-700" />
      </Link>
    </div>
  );
}
