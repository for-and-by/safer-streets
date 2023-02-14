import clsx from "clsx";
import React, { useState } from "react";
import { parseImageUrl } from "~/lib/parse-image-url";

interface Props {
  src: string;
}

export function ImageCollapse({ src }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        "relative overflow-hidden transition-all",
        !isExpanded ? "h-36" : "h-96"
      )}
    >
      <button
        className="btn btn-white absolute bottom-2 right-2 z-20"
        onClick={toggle}
      >
        <i
          className={clsx(
            "btn-icon icon",
            !isExpanded ? "icon-plus" : "icon-minus"
          )}
        />
      </button>
      <img
        src={parseImageUrl(src)}
        alt={`Report Thumbnail`}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
