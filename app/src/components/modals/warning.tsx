import React from "react";

import Modal from "~/components/composites/modal";

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
          <div className="sticky top-0 flex items-center justify-between p-2">
            <p className="ml-2 font-medium">{heading}</p>
            <Modal.Close className="btn btn-light">
              <i className="btn-icon icon icon-close" />
            </Modal.Close>
          </div>
          <div className="prose p-4">
            <p>{body}</p>
          </div>
          <div className="sticky top-0 flex items-center justify-between p-2">
            <Modal.Close className="btn btn-secondary">
              <p className="btn-text">Cancel</p>
            </Modal.Close>
            <Modal.Close className="btn btn-primary" onClick={onConfirm}>
              Confirm
            </Modal.Close>
          </div>
        </Modal.Panel>
      </Modal.Body>
    </Modal>
  );
}
