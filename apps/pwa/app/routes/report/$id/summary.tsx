import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

/*
 *   This loader takes fetches a summarised report
 * */

export const loader: LoaderFunction = async ({ params, context }) => {
  if (!params.id) return null;
  const supabase = context.getSupabase();

  const select = `
    id,
    lng,
    lat,
    updated_at,
    type:type_handle(
      title, 
      verify_by,
      expire_by
    ),
    content:content_id(
      image_url, 
      is_deleted,
      verified_at,
      severity:severity_handle(
        title
      )
    )
  `;

  const summary = await supabase
    .from("reports")
    .select(select)
    .eq("id", params.id)
    .limit(1)
    .single();

  return json({ summary: summary.data });
};
