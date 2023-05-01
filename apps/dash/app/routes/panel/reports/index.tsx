import { formatMetadata } from "~/utils/seo";

export const meta = () => {
  return formatMetadata({
    title: "Report",
  });
};

export default function Page() {
  return "Report";
}
