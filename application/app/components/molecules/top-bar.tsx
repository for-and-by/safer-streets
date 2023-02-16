import React from "react";
import { Link } from "@remix-run/react";

export default function TopBar() {
  return (
    <div className="pointer-events-auto flex w-full flex-row bg-base-100">
      <div className="flex flex-grow flex-row space-x-4 py-1 px-2">
        <p className="text-sm text-base-900">
          Endorsed By Jonathan Sriranganathan
        </p>
      </div>
      <Link to="/about" className="flex h-full items-center px-2">
        <i className="icon icon-info icon-sm before:text-brand-700" />
      </Link>
    </div>
  );
}
