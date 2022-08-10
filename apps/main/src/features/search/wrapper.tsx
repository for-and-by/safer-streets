import React from "react";

import SearchFooter from "./footer";
import SearchHeader from "./header";
import SearchResults from "./results";

interface Props {
  children?: React.ReactNode;
}

export default function SearchWrapper({ children }: Props) {
  return (
    <>
      <SearchHeader />
      {children}
      <SearchResults />
      <SearchFooter />
    </>
  );
}
