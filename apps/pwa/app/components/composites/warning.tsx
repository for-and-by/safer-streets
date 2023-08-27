import type { ComponentProps } from "react";

import { Modal, useModal } from "~/components/composites/modal";

export function useWarning(onConfirm: () => void) {
  const [modalState, modalActions] = useModal();

  function handleConfirm() {
    modalActions.hideModal();
    onConfirm();
  }

  const actions = {
    hideWarning: modalActions.hideModal,
    showWarning: modalActions.showModal,
    confirmWarning: handleConfirm,
  };

  return [modalState, actions] as const;
}

type PanelProps = {
  isShow: boolean;
  onHide: () => void;
  onConfirm: () => void;
  heading?: string;
  body?: string;
};

export function Panel(props: PanelProps) {
  const { isShow, onHide, onConfirm, heading, body } = props;
  return (
    <Modal.Body isShow={isShow}>
      <Modal.Tint onHide={onHide} />
      <Modal.Panel className="divide-y divide-base-200">
        <div className="sticky top-0 flex items-center justify-between p-2">
          <p className="ml-2 font-medium">{heading}</p>
          <Modal.Close className="btn btn-light" onHide={onHide}>
            <i className="btn-icon icon icon-close" />
          </Modal.Close>
        </div>
        <div className="p-4">
          <p>{body}</p>
        </div>
        <div className="sticky top-0 flex items-center justify-between p-2">
          <Modal.Close className="btn btn-light" onHide={onHide}>
            <p className="btn-text">Cancel</p>
          </Modal.Close>
          <Modal.Close className="btn btn-primary" onHide={onConfirm}>
            Confirm
          </Modal.Close>
        </div>
      </Modal.Panel>
    </Modal.Body>
  );
}

type TriggerProps = ComponentProps<typeof Modal.Trigger>;

export function Trigger(props: TriggerProps) {
  return <Modal.Trigger {...props} />;
}

export const Warning = { Panel, Trigger };
