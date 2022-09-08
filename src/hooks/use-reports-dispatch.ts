import useTypedDispatch from "~/hooks/use-typed-dispatch";
import reports from "~/store/reports/actions";

export default function useReportsDispatch() {
  const dispatch = useTypedDispatch();
  return {
    list: {
      sync: () => dispatch(reports.list.sync()),
    },
  };
}
