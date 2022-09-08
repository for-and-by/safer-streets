import supabase from "~/lib/supabase-client";

export default async function uploadFile(file?: File) {
  if (!file) return;

  const fnParts = file.name.split(".");
  const basename = fnParts.shift();
  const ext = fnParts.pop();
  const timestamp = Date.now();

  const filename = `${basename}-${timestamp}.${ext}`;

  const image = await supabase.storage
    .from("users")
    .upload(`reports/${filename}`, file);

  if (image.error) throw image.error;
  if (!image.data) throw "No data returned";

  const url = supabase.storage.from("users").getPublicUrl(image.data.Key);
  if (url.error) throw url.error;
  if (!url.data) throw "No url generated";

  return url.data.publicURL;
}
