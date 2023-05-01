import { formatMetadata } from "~/utils/seo";

export const meta = () => {
  return formatMetadata({
    title: "Login",
  });
};

export default function Page() {
  return "Login";
}
