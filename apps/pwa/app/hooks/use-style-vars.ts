import type { CSSProperties } from "react";
import { useMemo } from "react";

type Vars = Record<string, string>;

export function useStyleVars(vars: Vars, deps?: any[]) {
  return useMemo(() => {
    return Object.keys(vars).reduce((style, key) => {
      if (!vars[key]) return style;
      return Object.assign(style, { [`--${key}`]: vars[key] });
    }, {} as CSSProperties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? Object.values(vars));
}
