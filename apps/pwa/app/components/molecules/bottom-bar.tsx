import React from "react";

export default function BottomBar() {
  return (
    <div className="pointer-events-auto flex w-full bg-base-100">
      <div className="flex flex-grow flex-row space-x-2 px-2 text-base-700">
        <a
          className="py-1 text-sm underline underline-offset-4"
          href="~/features/layout/footer"
          target="_blank"
        >
          Terms
        </a>
        <a
          className="py-1 text-sm underline underline-offset-4"
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
        >
          Privacy
        </a>
      </div>
      <a
        className="px-2 py-1 text-sm"
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
      >
        &copy; Attribution
      </a>
    </div>
  );
}
