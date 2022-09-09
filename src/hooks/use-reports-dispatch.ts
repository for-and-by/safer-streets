import useTypedDispatch from "~/hooks/use-typed-dispatch";
import reports from "~/store/reports/actions";
import { Inputs } from "~/components/layout/create/provider";

export default function useReportsDispatch() {
  const dispatch = useTypedDispatch();
  return {
    sync: () => dispatch(reports.sync()),
    upload: (inputs: Inputs) => dispatch(reports.upload(inputs)),
  };
}