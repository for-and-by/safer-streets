import type { Content } from "~/components/blocks/builder";
import { BlockBuilder } from "~/components/blocks/builder";

export const content: Content = [
  {
    type: "hero",
    data: {
      heading: "The Safer Streets Initiative",
      subheading: "A community project to keep our streets safer",
    },
  },
  {
    type: "banner",
    data: {
      icon: "icon-info",
      text: "Endorsed by Jonathan Sriranganathan",
      cta: {
        text: "Learn More",
        url: "/endorsement",
      },
    },
  },
  {
    type: "content",
    data: {
      heading:
        "Safer Streets is a platform dedicated to sharing and communicating environmental safety issues that affect our local communities.",
      body: "Entirely anonymous and moderated by both the community and the team behind this project, Safer Streets is a project which intends to provide local communities with a space to share their thoughts about community safety.",
      cta: {
        text: "Learn More",
        url: "/about",
      },
    },
  },
  {
    type: "cards",
    data: {
      cards: [
        {
          icon: "icon-report",
          heading: "Low effort reporting",
          subheading:
            "Create anonymous reports about saftey issues in your area",
        },
        {
          icon: "icon-community",
          heading: "Community moderation",
          subheading:
            "Anyone from the community can participate in reviewing, updating, and deleting reports",
        },
        {
          icon: "icon-moderate",
          heading: "Sharing & Voting",
          subheading:
            "Safer streets provides a meaingful way for users to support each other in communicating risks",
        },
      ],
    },
  },
];

export default function HomeIndex() {
  return <BlockBuilder content={content} />;
}
