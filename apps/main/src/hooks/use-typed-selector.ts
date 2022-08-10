import type { TypedUseSelectorHook } from "react-redux";
import type { StoreState } from "~/types/store";

import { useSelector } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default useTypedSelector;
