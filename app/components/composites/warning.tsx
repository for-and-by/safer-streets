import type { ComponentProps } from "react";
import React from "react";

import {
  ModalBody,
  ModalClose,
  ModalPanel,
  ModalRoot,
  ModalTint,
  ModalTrigger,
} from "~/components/composites/modal";

type PropsRoot = ComponentProps<typeof ModalRoot>;

export function WarningRoot(props: PropsRoot) {
  return <ModalRoot {...props} />;
}

interface PropsPanel {
  children?: React.ReactNode;
  className?: string;
  heading?: string;
  body?: string;
  onConfirm?: () => void;
}

export function WarningPanel({
  children,
  className,
  heading,
  body,
  onConfirm,
}: PropsPanel) {
  return (
    <ModalBody>
      <ModalTint />
      <ModalPanel className="divide-y divide-base-200">
        <div className="sticky top-0 flex items-center justify-between p-2">
          <p className="ml-2 font-medium">{heading}</p>
          <ModalClose className="btn btn-light">
            <i className="btn-icon icon icon-close" />
          </ModalClose>
        </div>
        <div className="prose p-4">
          <p>{body}</p>
        </div>
        <div className="sticky top-0 flex items-center justify-between p-2">
          <ModalClose className="btn btn-secondary">
            <p className="btn-text">Cancel</p>
          </ModalClose>
          <ModalClose className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </ModalClose>
        </div>
      </ModalPanel>
    </ModalBody>
  );
}

type PropsTrigger = ComponentProps<typeof ModalTrigger>;

export function WarningTrigger(props: PropsTrigger) {
  return <ModalTrigger {...props} />;
}
