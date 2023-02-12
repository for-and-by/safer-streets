import type { ComponentProps, MouseEventHandler } from "react";
import React, { createContext, useState } from "react";
import clsx from "clsx";

import createContextHook from "~/hooks/factories/create-context-hook";

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

export function ModalRoot({ children }: PropsRoot) {
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

export function ModalTrigger({ className = "", children }: PropsTrigger) {
  const { showModal } = useModal();

  return (
    <button className={className} onClick={showModal}>
      {children}
    </button>
  );
}

type PropsBody = ComponentProps<"div">;

export function ModalBody({ children }: PropsBody) {
  const { isShow } = useModal();

  console.log(isShow);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-20 transition-all",
        isShow && "opacity-1 pointer-events-auto",
        !isShow && "pointer-events-none opacity-0"
      )}
    >
      {children}
    </div>
  );
}

export function ModalTint() {
  const { hideModal } = useModal();
  return <div onClick={hideModal} className="absolute inset-0 bg-black/50" />;
}

type PropsPanel = ComponentProps<"div">;

export function ModalPanel({ children, className }: PropsPanel) {
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

export function ModalClose({
  children,
  className = "",
  onClick = () => {},
}: PropsClose) {
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
