import React from "react";

export default function Logo() {
  return (
    <div className="flex flex-row items-center space-x-3">
      <i className="icon icon-logo before:text-brand-600" />
      <h1 className="text-base font-medium text-base-900">Safer Streets</h1>
    </div>
  );
}
