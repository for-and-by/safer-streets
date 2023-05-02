import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function PageHeader({ title, children }: Props) {
  return (
    <div className="flex w-full flex-col gap-8 py-12">
      <h1 className="px-8 text-xl font-medium">{title}</h1>
      <div className="px-8">{children}</div>
    </div>
  );
}
