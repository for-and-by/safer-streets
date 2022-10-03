import {
  ComponentProps,
  createContext,
  MouseEventHandler,
  useState,
} from "react";
import clsx from "clsx";

import createContextHook from "~/hooks/factories/create-context-hook";

import Portal from "~/components/elements/portal";
import Drawer from "~/components/composites/drawer";

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

interface PropsRoot extends ComponentProps<"div"> {}

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

interface PropsTrigger extends ComponentProps<"div"> {}

function Trigger({ className = "", children }: PropsTrigger) {
  const { showModal } = useModal();

  return (
    <div className={className} onClick={showModal}>
      {children}
    </div>
  );
}

interface PropsBody extends ComponentProps<"div"> {}

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

interface PropsPanel extends ComponentProps<"div"> {
  scrollable?: boolean;
}

function Panel({ className = "", children, scrollable = false }: PropsPanel) {
  const { isShow } = useModal();
  return (
    <div className="clamp absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Drawer
        show={isShow}
        className={className}
        position="center"
        scrollable={scrollable}
      >
        {children}
      </Drawer>
    </div>
  );
}

interface PropsClose extends ComponentProps<"button"> {}

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
