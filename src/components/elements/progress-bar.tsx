import React from "react";

interface Props {
  value: number;
}

export default function ProgressBar({ value = 10 }: Props) {
  const style = {
    "--progress": `${value.toString()}%`,
  } as React.CSSProperties;

  return (
    <div style={style} className="block h-0.5 w-full bg-base-100">
      <div className="block h-full w-[var(--progress)] bg-brand-600 transition-all" />
    </div>
  );
}
