import React, { ReactNode } from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface Props {
  label?: string;
  name?: string;
  children?: ReactNode;
  align?: "center" | "top";
  error?: FieldError;
}

export default function Wrapper({
  label,
  children,
  name,
  align = "center",
  error,
}: Props) {
  return (
    <>
      <div
        className={clsx(
          "relative flex w-full space-x-2 rounded-sm bg-gray-100 p-3 focus-within:outline focus-within:outline-brand-600/40",
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
          <p className="text-sm">{error?.message}</p>
        </div>
      ) : null}
    </>
  );
}
