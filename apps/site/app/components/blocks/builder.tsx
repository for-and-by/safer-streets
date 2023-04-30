import type { ComponentProps } from "react";
import { HeroBlock } from "~/components/blocks/hero";
import { ContentBlock } from "~/components/blocks/content";
import { CardsBlock } from "~/components/blocks/cards";
import { BannerBlock } from "~/components/blocks/banner";

export type Blocks =
  | typeof HeroBlock
  | typeof ContentBlock
  | typeof CardsBlock
  | typeof BannerBlock;

export type Content = (Blocks extends any ? ComponentProps<Blocks> : never)[];

type Props = {
  content: Content;
};

function NotFoundBlock() {
  return (
    <div className="rounded bg-red-500 p-4 text-white">
      <p>A block in use here is not supported.</p>
    </div>
  );
}

export function BlockBuilder({ content }: Props) {
  return (
    <>
      {content.map((item) => {
        switch (item.type) {
          case "hero":
            return <HeroBlock {...item} />;
          case "content":
            return <ContentBlock {...item} />;
          case "cards":
            return <CardsBlock {...item} />;
          case "banner":
            return <BannerBlock {...item} />;
          default:
            return <NotFoundBlock />;
        }
      })}
    </>
  );
}
