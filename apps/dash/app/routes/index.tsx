import { formatMetadata } from "~/utils/seo";

export const meta = () => {
  return formatMetadata({
    title: "Admin Panel",
  });
};

export default function Page() {
  return "Home";
}
