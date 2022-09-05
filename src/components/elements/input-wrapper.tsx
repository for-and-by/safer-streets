import React from "react";
import clsx from "clsx";

interface Props {
  label?: string;
  name?: string;
  children?: React.ReactNode;
  align?: "center" | "top";
}

export default function InputWrapper({
  label,
  children,
  name,
  align = "center",
}: Props) {
  return (
    <div
      className={clsx(
        "relative flex w-full space-x-4 rounded-sm bg-gray-100 p-3 focus-within:outline focus-within:outline-brand-400",
        align === "center" && "items-center",
        align === "top" && "items-start"
      )}
    >
      {label ? (
        <label className="w-16 font-semibold" htmlFor={name ?? ""}>
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}
