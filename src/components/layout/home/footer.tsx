import Drawer from "~/components/composites/drawer";
import useView from "~/hooks/view/use-view";
import { VIEWS } from "~/stores/view";

export default function HomeFooter() {
  const [view, setView] = useView();

  const handleShowCreate = () => setView(VIEWS.CREATE);

  return (
    <Drawer.Row className="p-2">
      <button className="btn btn-primary w-full" onClick={handleShowCreate}>
        <i className="btn-icon icon icon-pin-add" />
        <p className="btn-text">Create a Report</p>
      </button>
    </Drawer.Row>
  );
}
