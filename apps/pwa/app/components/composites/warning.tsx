import type { ComponentProps } from "react";
import React from "react";

import { Modal } from "~/components/composites/modal";

type PropsRoot = ComponentProps<typeof Modal>;

export function Root(props: PropsRoot) {
  return <Modal {...props} />;
}

interface PropsPanel {
  children?: React.ReactNode;
  className?: string;
  heading?: string;
  body?: string;
  onConfirm?: () => void;
}

export function Panel({ heading, body, onConfirm }: PropsPanel) {
  return (
    <Modal.Body>
      <Modal.Tint />
      <Modal.Panel className="divide-y divide-base-200">
        <div className="sticky top-0 flex items-center justify-between p-2">
          <p className="ml-2 font-medium">{heading}</p>
          <Modal.Close className="btn btn-light">
            <i className="btn-icon icon icon-close" />
          </Modal.Close>
        </div>
        <div className="p-4">
          <p>{body}</p>
        </div>
        <div className="sticky top-0 flex items-center justify-between p-2">
          <Modal.Close className="btn btn-light">
            <p className="btn-text">Cancel</p>
          </Modal.Close>
          <Modal.Close className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </Modal.Close>
        </div>
      </Modal.Panel>
    </Modal.Body>
  );
}

type PropsTrigger = ComponentProps<typeof Modal.Trigger>;

export function Trigger(props: PropsTrigger) {
  return <Modal.Trigger {...props} />;
}

export const Warning = Object.assign(Root, { Panel, Trigger });
