import type { Content } from "~/components/blocks/builder";
import { BlockBuilder } from "~/components/blocks/builder";

export const content: Content = [
  {
    type: "hero",
    data: {
      heading: "Safer Streets",
      subheading: "A community initiative to keep our streets safer",
      ctas: [
        {
          text: "Open App",
          url: "https://app.saferstreets.info",
          target: "_blank",
        },
        {
          text: "Learn More",
          url: "/about",
        },
      ],
    },
  },
];

export default function HomeIndex() {
  return <BlockBuilder content={content} />;
}
