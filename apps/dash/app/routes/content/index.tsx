import { formatMetadata } from "~/utils/seo";

export const meta = () => {
  return formatMetadata({
    title: "Report Content",
  });
};

export default function Page() {
  return "Report Content";
}
