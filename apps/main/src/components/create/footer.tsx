import React from "react";

import CreateCancel from "./cancel";
import { nextStage, prevStage, saveCenter, saveDetail } from "~/store/create";
import Drawer from "~/components/elements/drawer";
import Select from "~/components/form/select";
import { useSelector } from "react-redux";
import { geocode } from "~/components/search/helpers";
import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";

const StageOne = () => {
  const dispatch = useTypedDispatch();
  const map = useTypedSelector((state) => state.map);

  const handleNext = () => {
    dispatch(saveCenter(map.center));
    dispatch(nextStage());
  };

  return (
    <>
      <Drawer.Row className="justify-between p-2">
        <CreateCancel>
          <button className="btn btn-secondary">
            <p className="btn-text">Cancel</p>
          </button>
        </CreateCancel>

        <button className="btn btn-primary" onClick={handleNext}>
          <p className="btn-text">Provide Details</p>
        </button>
      </Drawer.Row>
    </>
  );
};

const StageTwo = () => {
  const dispatch = useTypedDispatch();
  const details = useTypedSelector((state) => state.create.submission.details);

  const handleUpdate = (event) =>
    dispatch(saveDetail({ [event.target.name]: event.target.value }));

  const handleNext = () => {
    dispatch(nextStage());
  };

  const handlePrev = () => {
    dispatch(prevStage());
  };
  return (
    <>
      <Drawer.Row className="flex-grow overflow-y-scroll p-2">
        <div className="flex w-full flex-col space-y-2">
          <Select
            label="Type"
            name="type"
            onChange={handleUpdate}
            value={details.type ?? ""}
            options={[
              { value: "flood", label: "Flood" },
              { value: "fire", label: "Fire" },
              { value: "suggestion", label: "Suggestion" },
              { value: "damage", label: "Damage" },
            ]}
          />
          <Select
            label="Affects"
            name="affects"
            onChange={handleUpdate}
            value={details.affects ?? ""}
            options={[
              { value: "all", label: "All" },
              { value: "pedestrian", label: "Pedestrians" },
              { value: "motorist", label: "Motorists" },
              { value: "wildlife", label: "Wildlife" },
            ]}
          />
          <Select
            label="Severity"
            name="severity"
            onChange={handleUpdate}
            value={details.severity ?? ""}
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
              { value: "none", label: "None" },
            ]}
          />
          <div className="flex w-full flex-col space-y-2">
            <label htmlFor="notes">Any notes on this issue?</label>
            <textarea
              className="w-full rounded-sm bg-gray-100 p-2"
              lines={4}
              name="notes"
              onChange={handleUpdate}
              value={details.notes ?? ""}
            />
          </div>
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-secondary" onClick={handlePrev}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          <p className="btn-text">Review</p>
        </button>
      </Drawer.Row>
    </>
  );
};

const StageThree = () => {
  const dispatch = useTypedDispatch();
  const submission = useTypedSelector((state) => state.create.submission);

  const { loading, data, error } = useAsync(
    geocode,
    { coordinates: submission.coordinates },
    [submission.coordinates]
  );

  const handleNext = () => {
    dispatch(nextStage());
  };

  const handlePrev = () => {
    dispatch(prevStage());
  };

  return (
    <>
      <Drawer.Row className="p-2">
        <div className="flex w-full flex-col space-y-1 rounded bg-gray-100 p-2">
          <p className="font-semibold capitalize">Approximate Location</p>
          {loading ? (
            <p className="text-gray-400">Finding Addresss...</p>
          ) : (
            <p>{data}</p>
          )}
        </div>
      </Drawer.Row>
      <Drawer.Row className="p-2">
        <div className="flex flex-col space-y-2">
          {Object.keys(submission.details ?? {}).map((key) => {
            return (
              <div key={key} className="flex flex-row space-x-2">
                <p className="w-20 font-semibold capitalize">{key}</p>
                <p className="capitalize">{submission.details[key]}</p>
              </div>
            );
          })}
        </div>
      </Drawer.Row>

      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-secondary" onClick={handlePrev}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          <p className="btn-text">Submit</p>
        </button>
      </Drawer.Row>
    </>
  );
};

const stageComponents = {
  location: StageOne,
  details: StageTwo,
  confirm: StageThree,
};

const CreateFooter = () => {
  const { isFocused } = useView("create");
  const dispatch = useDispatch();

  const stage = useSelector((state) => state.create.stage);

  useEffect(() => {
    dispatch(lockFocus());
    () => dispatch(unlockFocus());
  }, []);

  const CurrentStage = stageComponents[stage.handle];

  return (
    <Drawer
      show={isFocused}
      position="bottom"
      transition="slide"
      className="divide-y divide-gray-200"
    >
      <Drawer.Row className="p-3">
        <p className="text-base-800">{stage.description}</p>
      </Drawer.Row>
      <CurrentStage />
    </Drawer>
  );
};

CreateFooter.propTypes = {};

export default CreateFooter;
