import React from "react";

import { useMapContext } from "./provider";

interface Props extends React.ComponentProps<"div"> {}

export default function Map(props: Props) {
  const { ref } = useMapContext();
  return <div ref={ref} {...props} />;
}
