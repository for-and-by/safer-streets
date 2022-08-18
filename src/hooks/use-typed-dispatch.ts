import type { StoreDispatch } from "~/types/store";

import { useDispatch } from "react-redux";

const useTypedDispatch: () => StoreDispatch = useDispatch;

export default useTypedDispatch;
