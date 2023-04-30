import type { Content } from "~/components/blocks/builder";
import { BlockBuilder } from "~/components/blocks/builder";
import { formatMetadata } from "~/utils/seo";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta = () => {
  return formatMetadata({
    title: "Contact",
  });
};

export const loader = async () => {
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

  return json(content);
};

export default function Page() {
  const content = useLoaderData() as Content;
  return <BlockBuilder content={content} />;
}
