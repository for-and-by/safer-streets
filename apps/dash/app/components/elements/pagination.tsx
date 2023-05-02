import type { MouseEventHandler } from "react";
import clsx from "clsx";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { loader } from "~/routes/panel/reports";

export function Pagination() {
  const { pageCount } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex divide-x divide-gray-100">
      {Array(pageCount)
        .fill(null)
        .map((_, index) => {
          const page = index + 1;
          const currentPage = parseInt(searchParams.get("page") ?? "1");

          const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
            const newParams = new URLSearchParams(searchParams);
            if (page === 1) newParams.delete("page");
            else newParams.set("page", page.toString());
            setSearchParams(newParams);
          };

          return (
            <button
              key={index}
              className={clsx(
                "flex h-12 w-12 items-center justify-center",
                currentPage === page ? "btn-primary" : "btn-white"
              )}
              onClick={handleClick}
            >
              {page}
            </button>
          );
        })}
    </div>
  );
}
