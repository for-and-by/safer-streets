import type { ComponentProps, FC } from "react";
import { HeroBlock } from "~/components/blocks/hero";

export type Blocks = typeof HeroBlock;

export type BlockProps = Blocks extends any ? ComponentProps<Blocks> : never;
export type BlockTypes = BlockProps["type"];
export type BlockMap = {
  [Key in BlockTypes | "default"]: FC<Extract<BlockProps, { type: Key }>>;
};

export type Content = BlockProps[];

const blocks: BlockMap = {
  hero: HeroBlock,
  default: () => (
    <div className="rounded bg-red-500 p-4 text-white">
      <p>A block in use here is not supported.</p>
    </div>
  ),
};

type Props = {
  content: Content;
};

export function BlockBuilder({ content }: Props) {
  return (
    <>
      {content.map((item) => {
        const Block = blocks[item.type] ?? blocks["default"];
        const key = JSON.stringify(item);
        return <Block key={key} {...item} />;
      })}
    </>
  );
}
