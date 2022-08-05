import type { TypedUseSelectorHook } from "react-redux";
import type { StoreState, StoreDispatch } from "./types";

import { useDispatch, useSelector } from "react-redux";

export const useTypedDispatch: () => StoreDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;
