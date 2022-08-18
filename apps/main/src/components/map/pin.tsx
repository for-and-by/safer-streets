import React from "react";
import clsx from "clsx";

interface Props {
  icon?: string;
  children?: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Pin({ icon, className }: Props) {
  return (
    <div
      className={clsx(
        "relative flex h-8 w-8 origin-bottom-right rotate-45 items-center justify-center rounded-full rounded-br-none bg-brand-600",
        className
      )}
    >
      <i className={clsx(icon, "icon -rotate-45 before:text-white")} />
    </div>
  );
}
