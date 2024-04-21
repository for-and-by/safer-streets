import React, { useState } from "react";
import { parseImageUrl } from "~/lib/image";

interface Props {
  src: string;
}

export function ImageCollapse({ src }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      data-expanded={isExpanded}
      className="group/image-collapse relative h-36 overflow-hidden transition-all data-expanded:h-96"
    >
      <button
        className="btn btn-white absolute bottom-2 right-2 z-20"
        onClick={handleToggle}
      >
        <i
          className={`btn-icon icon ${isExpanded ? "icon-minus" : "icon-plus"}`}
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
