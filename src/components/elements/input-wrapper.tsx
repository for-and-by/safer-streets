import React from "react";
import clsx from "clsx";

interface Props {
  label?: string;
  name?: string;
  children?: React.ReactNode;
  align?: "center" | "top";
  error?: boolean | string;
}

export default function InputWrapper({
  label,
  children,
  name,
  align = "center",
  error = false,
}: Props) {
  return (
    <>
      <div
        className={clsx(
          "relative flex w-full space-x-4 rounded-sm bg-gray-100 p-3 focus-within:outline focus-within:outline-brand-600/40",
          align === "center" && "items-center",
          align === "top" && "items-start",
          error && "outline outline-error-600/40"
        )}
      >
        {label ? (
          <label className="w-16 text-gray-400" htmlFor={name ?? ""}>
            {label}
          </label>
        ) : null}
        {children}
      </div>
      {error ? (
        <div className="bg-error-50 p-2 text-error-800">
          <p className="text-sm">{error}</p>
        </div>
      ) : null}
    </>
  );
}
