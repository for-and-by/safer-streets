import { useView } from "~/features/views/hooks";

import Drawer from "~/features/ui/drawer";

export default function HomeFooter() {
  const { isActive, setActiveView } = useView("default");

  const handleShowCreate = () => setActiveView("create");

  return (
    <Drawer
      position="bottom"
      show={isActive}
      className="divide-y divide-base-100"
    >
      <Drawer.Row className="p-2">
        <button className="btn btn-primary w-full" onClick={handleShowCreate}>
          <i className="btn-icon ri-pushpin-fill" />
          <p className="btn-text">Report a Hazard</p>
        </button>
      </Drawer.Row>
    </Drawer>
  );
}
