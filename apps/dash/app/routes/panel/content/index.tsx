import { formatMetadata } from "~/utils/seo";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import type { FormEventHandler } from "react";
import { PageHeader } from "~/components/globals/page-header";
import type { ReportContent, Severity } from "@safer-streets/db";
import { SEVERITIES, SupabaseClient, TYPES } from "@safer-streets/db";
import { Pagination } from "~/components/elements/pagination";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPageRange } from "~/utils/data";
import { ContentTile } from "~/components/modules/content-tile";

export const meta = () => {
  return formatMetadata({
    title: "Report Content",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const page = url.searchParams.get("page") ?? "1";
  const sortBy = url.searchParams.get("sort_by") ?? "newest";
  const type = url.searchParams.get("type") ?? "all";
  const severity = url.searchParams.get("severity") ?? "all";
  const textSearch = url.searchParams.get("query");

  const [from, to] = getPageRange(20, parseInt(page));

  const select = `
    *,
    report:report_id(
      type:type_handle(
        handle,
        title
      )
    ), 
    severity:severity_handle(
      title
    ), 
    details
  `;

  const query = SupabaseClient.from("reports_content")
    .select(select, { count: "exact" })
    .range(from, to);

  if (sortBy === "created_recently") {
    query.order("created_at", { ascending: false });
  }

  if (sortBy === "id") {
    query.order("id", { ascending: true });
  }

  if (sortBy === "report_id") {
    query.order("report_id", { ascending: true });
  }

  if (type !== "all") {
    query.eq("report.type.handle", type);
  }

  if (severity !== "all") {
    query.eq("severity_handle", severity);
  }

  if (textSearch) {
    query.textSearch("details", textSearch);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  const pageCount = count ? Math.ceil(count / 20) : 1;

  return json({
    content: data,
    pageCount,
  });
};

export default function Page() {
  const { content } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const submit = useSubmit();

  const handleChange: FormEventHandler<HTMLFormElement> = (event) => {
    submit(event.currentTarget, { replace: true });
  };

  return (
    <div className="flex h-[100vh] flex-col divide-y divide-gray-100 overflow-y-scroll">
      <PageHeader title="Reports Content">
        <Form onChange={handleChange} className="flex gap-4">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              defaultValue={searchParams?.get("type") ?? undefined}
              className="rounded bg-gray-100 p-4 capitalize"
            >
              <option value="all">all</option>
              {Object.values(TYPES).map((handle) => (
                <option key={handle} value={handle}>
                  {handle}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="severity">Severity</label>
            <select
              name="severity"
              defaultValue={searchParams?.get("severity") ?? undefined}
              className="rounded bg-gray-100 p-4 capitalize"
            >
              <option value="all">all</option>
              {Object.values(SEVERITIES).map((handle) => (
                <option key={handle} value={handle}>
                  {handle}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="query">Search</label>
            <input
              name="query"
              type="search"
              defaultValue={searchParams?.get("query") ?? ""}
              className="rounded bg-gray-100 p-4"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="sort_by">Sort By</label>
            <select
              name="sort_by"
              defaultValue={searchParams?.get("sort_by") ?? undefined}
              className="rounded bg-gray-100 p-4"
            >
              <option value="created_recently">Created Most Recently</option>
              <option value="report_id">Report ID</option>
              <option value="id">ID</option>
            </select>
          </div>
        </Form>
      </PageHeader>
      <div className="p-8">
        <Pagination />
      </div>
      <div className="flex flex-col gap-2 p-4">
        {content?.map((item: ReportContent & { severity: Severity }) => (
          <ContentTile key={item.id} content={item} />
        ))}
      </div>
      <div className="p-8">
        <Pagination />
      </div>
    </div>
  );
}
