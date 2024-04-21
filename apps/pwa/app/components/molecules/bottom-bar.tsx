import React from "react";

export default function BottomBar() {
  return (
    <div className="pointer-events-auto flex w-full bg-base-100">
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
