import clsx from "clsx";

type Props = {
  type: "cards";
  data: {
    heading?: string;
    subheading?: string;
    cards: {
      icon: string;
      heading: string;
      subheading: string;
    }[];
  };
};

export function CardsBlock({ data }: Props) {
  return (
    <>
      <div className="flex flex-col gap-2 bg-white px-8 py-12">
        {data?.heading ? (
          <h3 className="text-lg font-medium">{data.heading}</h3>
        ) : null}
        {data?.subheading ? <p>{data.subheading}</p> : null}
        <div className="flex gap-2">
          {data.cards.map((card) => (
            <div
              key={card.icon}
              className="flex w-full flex-col gap-2 border border-gray-100 bg-white p-8"
            >
              <i className={clsx("icon icon-16 mb-4", card.icon)} />
              <p className="font-medium">{card.heading}</p>
              <p>{card.subheading}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
