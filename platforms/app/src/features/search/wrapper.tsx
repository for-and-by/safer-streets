import React from "react";

import SearchFooter from "./header";
import SearchHeader from "./footer";
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
