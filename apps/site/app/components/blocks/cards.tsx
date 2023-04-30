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
      {data?.heading && data?.subheading ? (
        <div className="flex items-center gap-4 rounded-md bg-white p-8">
          {data?.heading ? (
            <h3 className="text-lg font-medium">{data.heading}</h3>
          ) : null}
          {data?.subheading ? (
            <p className="text-gray-500">{data.subheading}</p>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-col gap-2 md:flex-row">
        {data.cards.map((card) => (
          <div
            key={card.icon}
            className="flex w-full flex-col gap-2 rounded-md bg-white p-8"
          >
            <i
              className={clsx(
                "icon icon-16 mb-4 before:text-brand-600",
                card.icon
              )}
            />
            <p className="font-medium">{card.heading}</p>
            <p className="text-gray-500">{card.subheading}</p>
          </div>
        ))}
      </div>
    </>
  );
}
