import type { Content } from "~/components/blocks/builder";
import { BlockBuilder } from "~/components/blocks/builder";

const content: Content = [
  {
    type: "content",
    data: {
      heading: "Need to get in touch?",
      body: "If you're looking for a way to drop us a message, feel free to send me an email using the button below! For anything from any issues you've found, a feature you thing is worthwhile - even if you just have something nice to say. That's always good too!",
      cta: {
        text: "Send an email",
        url: "mailto://saferstreets+info@jtaccinelli.com.au",
      },
    },
  },
  {
    type: "content",
    data: {
      heading: "Want to lend a hand?",
      body: "If you're interested in lending a hand, send an email using the button below to a slightly different email address, so I know they're separate requests!",
      cta: {
        text: "Sign up to help",
        url: "mailto://volunteering+info@jtaccinelli.com.au",
      },
    },
  },
];

export default function Page() {
  return <BlockBuilder content={content} />;
}
