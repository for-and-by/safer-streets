import { ContextSelector } from "~/types/smart-context";

import useSmartContext from "~/hooks/use-smart-context";

import { MapContext } from "~/components/map/provider";

export default function useMap<V, S>(selector: ContextSelector<V, S>) {
  const value = useSmartContext<V, S>(MapContext, selector);
}
