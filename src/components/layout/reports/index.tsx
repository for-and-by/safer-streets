export default function Reports() {
	return null;

	// const reports = useReportsDispatch();
	//
	// const syncing = useTypedSelector((state) => state.reports.pending.sync);
	// const list = useTypedSelector((state) => state.reports.list);
	//
	// React.useEffect(() => {
	//   reports.sync();
	// }, []);
	//
	// return (
	//   <>
	//     <Toast content={"Syncing Reports..."} show={syncing} />
	//     {list.map((report) => (
	//       <ReportMarker key={report.id} report={report} />
	//     ))}
	//   </>
	// );
}
