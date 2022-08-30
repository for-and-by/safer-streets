import React, { useEffect } from "react";

import create from "~/store/create/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";

import Drawer from "~/components/composites/drawer";
import map from "~/store/map/actions";
import geocode from "~/lib/geocode";

export default function CreateFooter() {
  const dispatch = useTypedDispatch();
  const stage = useTypedSelector((state) => state.create.stage);

  const handleShowNext = () => dispatch(create.stage.next());
  const handleShowPrev = () => dispatch(create.stage.prev());

  const stages: {
    [key: string]: () => JSX.Element;
  } = {
    location() {
      const center = useTypedSelector((state) => state.map.center);
      const [address, setAddress] = React.useState<string>("");
      const [loading, setLoading] = React.useState<boolean>(false);

      useEffect(() => {
        dispatch(map.controls.unlock());
      }, []);

      useEffect(() => {
        setLoading(true);
        geocode(center as [number, number])
          .then((result) => {
            setAddress(result?.[0]?.heading ?? "");
          })
          .finally(() => {
            setLoading(false);
          });
      }, [center]);

      return (
        <>
          <Drawer.Row className="p-2">
            <div className="flex w-full flex-row items-center space-x-2 bg-gray-100 p-2">
              {loading ? (
                <>
                  <i className="icon icon-circle-anim icon-is-spinning before:text-gray-500" />
                  <p>Searching for address...</p>
                </>
              ) : (
                <div className="space-y flex flex-col">
                  <p className="text-gray-400">Approximate Address</p>
                  <p>{address}</p>
                </div>
              )}
            </div>
          </Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={handleShowPrev}>
              <p className="btn-text">Cancel</p>
            </button>
            <button className="btn btn-primary" onClick={handleShowNext}>
              <p className="btn-text">Provide Details</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    details() {
      useEffect(() => {
        dispatch(map.controls.lock());
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Provide Details</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={handleShowPrev}>
              <p className="btn-text">Go Back</p>
            </button>
            <button className="btn btn-primary" onClick={handleShowNext}>
              <p className="btn-text">Upload Images</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    image() {
      useEffect(() => {
        dispatch(map.controls.lock());
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Upload Image</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={handleShowPrev}>
              <p className="btn-text">Go Back</p>
            </button>
            <button className="btn btn-primary" onClick={handleShowNext}>
              <p className="btn-text">Confirm Details</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    confirm() {
      useEffect(() => {
        dispatch(map.controls.lock());
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Confirm Details</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={handleShowPrev}>
              <p className="btn-text">Go Back</p>
            </button>
            <button className="btn btn-primary" onClick={handleShowNext}>
              <p className="btn-text">Submit Report</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    submit() {
      useEffect(() => {
        dispatch(map.controls.lock());
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Submit Details</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={handleShowPrev}>
              <p className="btn-text">Cancel Report</p>
            </button>
            <button className="btn btn-primary" onClick={handleShowNext}>
              <p className="btn-text">Provide Details</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
  };

  const Stage = stages[stage.handle];

  return (
    <>
      <Drawer.Row className="p-3">
        <p className="text-base text-gray-500">{stage.description}</p>
      </Drawer.Row>
      <Stage />
    </>
  );
}
