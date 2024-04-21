import type { ReactNode } from "react";
import React from "react";
import type { FieldError } from "react-hook-form";

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
        data-align={align}
        data-error={!!error?.message}
        className="
          relative flex
          w-full gap-2 rounded-sm bg-gray-100 p-3
          focus-within:outline focus-within:outline-brand-700/40
          data-error:outline data-error:outline-error-600/40
          data-align-center:items-center
          data-align-top:items-start"
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
