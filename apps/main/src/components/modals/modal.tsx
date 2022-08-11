import React from "react";
import clsx from "clsx";

import createContextHook from "~/lib/create-context-hook";

import Portal from "~/components/elements/portal";
import Drawer from "~/components/elements/drawer";

interface Props {
  Root: {
    children?: React.ReactNode;
  };
  Body: {
    children?: React.ReactNode;
  };
  Tint: {};
  Panel: {
    children?: React.ReactNode;
    className?: string;
  };
  Trigger: {
    children?: React.ReactNode;
    className?: string;
  };
  Close: {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
  };
}

interface ModalContextValue {
  show: boolean;
  hideModal: () => void;
  showModal: () => void;
}

const ModalContext = React.createContext<ModalContextValue>({
  show: false,
  hideModal: () => null,
  showModal: () => null,
});

const useModal = createContextHook<ModalContextValue>({ ModalContext });

function Root({ children }: Props["Root"]) {
  const [show, setShow] = React.useState<ModalContextValue["show"]>(false);

  const value: ModalContextValue = {
    show,
    hideModal: () => setShow(false),
    showModal: () => setShow(true),
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function Trigger({ className = "", children }: Props["Trigger"]) {
  const { showModal } = useModal();

  return (
    <div className={className} onClick={showModal}>
      {children}
    </div>
  );
}

function Body({ children }: Props["Body"]) {
  const { show } = useModal();

  return (
    <Portal>
      <div
        className={clsx(
          "fixed inset-0 z-20 transition-all",
          show && "opacity-1 pointer-events-auto",
          !show && "pointer-events-none opacity-0"
        )}
      >
        {children}
      </div>
    </Portal>
  );
}

function Tint({}: Props["Tint"]) {
  const { hideModal } = useModal();
  return <div onClick={hideModal} className="absolute inset-0 bg-black/50" />;
}

function Panel({ className = "", children }: Props["Panel"]) {
  const { show } = useModal();
  return (
    <div className="absolute left-1/2 top-1/2 m-3 -translate-x-1/2 -translate-y-1/2">
      <Drawer show={show} className={className} position="center">
        {children}
      </Drawer>
    </div>
  );
}

function Close({
  children,
  className = "",
  onClick = () => {},
}: Props["Close"]) {
  const { hideModal } = useModal();

  const handleClick = () => {
    onClick();
    hideModal();
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
}

const Modal = Object.assign(Root, { Tint, Body, Trigger, Panel, Close });
export default Modal;
