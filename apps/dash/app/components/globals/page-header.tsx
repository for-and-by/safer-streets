import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function PageHeader({ title, children }: Props) {
  return (
    <div className="flex w-full flex-col">
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
}
