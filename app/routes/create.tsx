import React from "react";
import { CreateTemplate } from "~/components/templates/create";
import CreateProvider from "~/components/templates/create/context";

export default function Home() {
  return (
    <CreateProvider>
      <CreateTemplate />
    </CreateProvider>
  );
}
