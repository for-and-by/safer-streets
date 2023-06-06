import type { ComponentProps, MouseEventHandler } from "react";
import React, { createContext, useState } from "react";

import createContextHook from "~/hooks/factories/create-context-hook";
import Portal from "~/components/atoms/portal";

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
    <button className={className} onClick={showModal}>
      {children}
    </button>
  );
}

type PropsBody = ComponentProps<"div">;

function Body({ children }: PropsBody) {
  const { isShow } = useModal();

  return (
    <Portal>
      <div
        data-visible={isShow}
        className="
          group/modal
          pointer-events-none
          fixed inset-0 z-20
          opacity-0 transition-all
          data-visible:pointer-events-auto data-visible:opacity-100"
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
  return (
    <div
      className={`
        clamp group absolute bottom-8 left-1/2 
        -translate-x-1/2 translate-y-8 
        rounded bg-white transition-all 
        group-data-visible/modal:translate-y-0 
        ${className}
      `}
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

export const Modal = Object.assign(Root, { Trigger, Body, Panel, Tint, Close });
