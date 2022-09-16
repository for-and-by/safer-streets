import { Dispatch, SetStateAction } from "react";

export type UseStateHook<V> = [V, Dispatch<SetStateAction<V>>];
