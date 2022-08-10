import { useEffect } from "react";

import ProgressBar from "~/features/ui/progress-bar";
import Drawer from "~/features/ui/drawer";

import CreateCancel from "./cancel";

import useTypedSelector from "~/hooks/use-typed-selector";
import useView from "~/hooks/use-view";

export default function CreateHeader() {
  const { isActive, setActiveView } = useView("create");

  const stage = useTypedSelector((state) => state.create.stage);

  const handleExit = () => {
    setActiveView("default");
  };

  return (
    <Drawer show={isActive} position="top">
      <Drawer.Row className="overflow-hidden">
        <div className="w-full">
          <div className="flex flex-row items-center space-x-3 p-3  ">
            <CreateCancel>
              <i className="btn-icon ri-arrow-left-line" />
            </CreateCancel>
            <div>
              <h3 className="text-base font-semibold text-base-900">
                Report a Hazard
              </h3>
              <p className="text-sm text-base-400">{stage.heading}</p>
            </div>
          </div>
          <ProgressBar value={stage.progress} />
        </div>
      </Drawer.Row>
    </Drawer>
  );
}
