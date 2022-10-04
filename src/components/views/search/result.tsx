import { ComponentProps, MouseEventHandler } from "react";
import { SearchFeature } from "~/types/search";
import useMapCenter from "~/hooks/map/use-map-center";

interface Props extends ComponentProps<"div"> {
  feature: SearchFeature;
}

export default function SearchResult({
  feature,
  onClick,
  className,
  ...props
}: Props) {
  const [center, setCenter] = useMapCenter();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (onClick) onClick(event);
    if (feature?.center) setCenter(feature?.center);
  };

  return (
    <div
      {...props}
      className="flex w-full flex-col bg-white p-3 transition-all hover:cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <p className="text-base text-base-700">{feature?.heading}</p>
      <p className="text-sm text-base-400">{feature?.subheading}</p>
    </div>
  );
}
