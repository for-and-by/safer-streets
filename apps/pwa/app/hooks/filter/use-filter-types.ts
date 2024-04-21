import { useFilterStore } from "~/hooks/filter/use-filter-store";
import type { Type } from "@safer-streets/db";
import { useEffect, useState } from "react";

export function useFilterTypes(): [Type[], (handle?: string) => Type];
export function useFilterTypes(handle: string): Type;

export function useFilterTypes(handle?: string) {
  const { types } = useFilterStore();

  function getType(handle?: string) {
    return types.find((type) => {
      return type.handle === handle;
    });
  }

  const [type, setType] = useState(getType(handle));

  useEffect(() => {
    if (handle) setType(getType(handle));
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  return handle ? type : [types, getType];
}
