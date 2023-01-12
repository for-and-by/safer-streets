import React, {
  ComponentProps,
  createContext,
  MouseEventHandler,
  useState,
} from "react";
import clsx from "clsx";

import createContextHook from "~/hooks/factories/create-context-hook";

import Portal from "~/components/elements/portal";

interface ContextValue {
  isShow: boolean;
  hideModal: () => void;
  showModal: () => void;
}

const initialValue: ContextValue = {
  isShow: false,
  hideModal: () => null,
  showModal: () => null,
};

const ModalContext = createContext(initialValue);
const useModal = createContextHook({ ModalContext });

type PropsRoot = ComponentProps<"div">;

function Root({ children }: PropsRoot) {
  const { isShow: _isShow } = initialValue;
  const [isShow, setShow] = useState(_isShow);

  const value: ContextValue = {
    isShow,
    hideModal: () => setShow(false),
    showModal: () => setShow(true),
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

type PropsTrigger = ComponentProps<"div">;

function Trigger({ className = "", children }: PropsTrigger) {
  const { showModal } = useModal();

  return (
    <div className={className} onClick={showModal}>
      {children}
    </div>
  );
}

type PropsBody = ComponentProps<"div">;

function Body({ children }: PropsBody) {
  const { isShow } = useModal();

  return (
    <Portal>
      <div
        className={clsx(
          "fixed inset-0 z-20 transition-all",
          isShow && "opacity-1 pointer-events-auto",
          !isShow && "pointer-events-none opacity-0"
        )}
      >
        {children}
      </div>
    </Portal>
  );
}

function Tint() {
  const { hideModal } = useModal();
  return <div onClick={hideModal} className="absolute inset-0 bg-black/50" />;
}

type PropsPanel = ComponentProps<"div">;

function Panel({ children, className }: PropsPanel) {
  const { isShow } = useModal();
  return (
    <div
      className={clsx(
        "clamp absolute left-1/2 bottom-0 -translate-x-1/2 rounded-t bg-white transition-all",
        isShow ? "translate-y-0" : "translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}

type PropsClose = ComponentProps<"button">;

function Close({ children, className = "", onClick = () => {} }: PropsClose) {
  const { hideModal } = useModal();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(event);
    hideModal();
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

const Modal = Object.assign(Root, { Tint, Body, Trigger, Panel, Close });
export default Modal;
