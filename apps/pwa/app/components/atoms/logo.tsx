import React from "react";

export function Logo() {
  return (
    <div className="flex flex-row items-center gap-3">
      <i className="icon icon-logo before:text-brand-700" />
      <h1 className="text-base font-medium text-base-900">Safer Streets</h1>
    </div>
  );
}
