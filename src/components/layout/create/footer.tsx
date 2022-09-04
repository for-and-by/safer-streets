import React from "react";

import useTypedSelector from "~/hooks/use-typed-selector";
import useGeocoder from "~/hooks/use-geocoder";
import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import Toast from "~/components/composites/toast";
import useMapDispatch from "~/hooks/use-map-dispatch";

export default function CreateFooter() {
  const map = useMapDispatch();
  const form = useCreateForm();

  const stages: {
    [key: string]: () => JSX.Element;
  } = {
    location() {
      const center = useTypedSelector((state) => state.map.center);

      React.useEffect(() => {
        map.controls.unlock();
      }, []);

      const { results, loading } = useGeocoder(center);

      return (
        <>
          <Toast show={loading} content={"Searching for address..."} />
          <Drawer.Row className="p-2">
            <div className="flex w-full flex-row items-center space-x-2 bg-gray-100 p-2">
              {!(results?.length > 0) ? (
                <>
                  <i className="icon icon-circle-anim icon-is-spinning before:text-gray-500" />
                  <p>Searching for address...</p>
                </>
              ) : (
                <div className="space-y flex flex-col">
                  <p className="text-gray-400">Approximate Address</p>
                  <p>{results?.[0]?.heading}</p>
                </div>
              )}
            </div>
          </Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={() => form.stage.prev()}>
              <p className="btn-text">Cancel</p>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => form.stage.next()}
            >
              <p className="btn-text">Provide Details</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    details() {
      React.useEffect(() => {
        map.controls.lock();
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Provide Details</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={() => form.stage.prev()}>
              <p className="btn-text">Go Back</p>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => form.stage.next()}
            >
              <p className="btn-text">Upload Images</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    image() {
      React.useEffect(() => {
        map.controls.lock();
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Upload Image</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={() => form.stage.prev()}>
              <p className="btn-text">Go Back</p>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => form.stage.next()}
            >
              <p className="btn-text">Confirm Details</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    confirm() {
      React.useEffect(() => {
        map.controls.lock();
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Confirm Details</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={() => form.stage.prev()}>
              <p className="btn-text">Go Back</p>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => form.stage.next()}
            >
              <p className="btn-text">Submit Report</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
    submit() {
      React.useEffect(() => {
        map.controls.lock();
      }, []);
      return (
        <>
          <Drawer.Row className="p-2">Submit Details</Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <button className="btn btn-light" onClick={() => form.stage.prev()}>
              <p className="btn-text">Cancel Report</p>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => form.stage.next()}
            >
              <p className="btn-text">Provide Details</p>
            </button>
          </Drawer.Row>
        </>
      );
    },
  };

  const Stage = stages[form.stage.handle];

  return (
    <>
      <Drawer.Row className="p-3">
        <p className="text-base text-gray-500">
          {form.stage.value.description}
        </p>
      </Drawer.Row>
      <Stage />
    </>
  );
}
