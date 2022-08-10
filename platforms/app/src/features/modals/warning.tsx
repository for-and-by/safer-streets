import React from "react";

import Modal from "~/features/modals/modal";
import Drawer from "~/features/ui/drawer";

interface Props {
  children?: React.ReactNode;
  className?: string;
  heading?: string;
  body?: string;
  onConfirm?: () => void;
}

export default function WarningModal({
  children,
  className,
  heading,
  body,
  onConfirm,
}: Props) {
  return (
    <Modal>
      <Modal.Trigger className={className}>{children}</Modal.Trigger>
      <Modal.Body>
        <Modal.Tint />
        <Modal.Panel className="divide-y divide-base-200">
          <Drawer.Row sticky className="justify-between p-2">
            <p className="ml-2 font-semibold">{heading}</p>
            <Modal.Close className="btn btn-light">
              <i className="btn-icon ri-close-fill" />
            </Modal.Close>
          </Drawer.Row>
          <Drawer.Row className="prose p-4">
            <p>{body}</p>
          </Drawer.Row>
          <Drawer.Row className="justify-between p-2">
            <Modal.Close className="btn btn-secondary">
              <p className="btn-text">Cancel</p>
            </Modal.Close>
            <Modal.Close className="btn btn-primary" onClick={onConfirm}>
              Confirm
            </Modal.Close>
          </Drawer.Row>
        </Modal.Panel>
      </Modal.Body>
    </Modal>
  );
}
