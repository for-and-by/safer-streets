import { useState, useContext, createContext } from "react";
import clsx from "clsx";
import types from "prop-types";

import Portal from "~/components/utility/Portal";
import Drawer from "~/components/composites/Drawer";

const ModalContext = createContext();
const ModalProvider = ModalContext.Provider;
const useModal = () => useContext(ModalContext);

const Root = ({ children }) => {
  const [show, setShow] = useState(false);

  const value = {
    show,
    hideModal: () => setShow(false),
    showModal: () => setShow(true),
  };

  return <ModalProvider value={value}>{children}</ModalProvider>;
};

Root.propTypes = {};

const Trigger = ({ children, className }) => {
  const { showModal } = useModal();
  return (
    <div
      className={className}
      onClick={showModal}
    >
      {children}
    </div>
  );
};

Trigger.propTypes = {
  className: types.string,
};

const Body = ({ children }) => {
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
};

Body.propTypes = {};

const Tint = () => {
  const { hideModal } = useModal();
  return (
    <div
      onClick={hideModal}
      className="absolute inset-0 bg-black/50"
    />
  );
};

Tint.propTypes = {};

const Panel = ({ className, children }) => {
  const { show } = useModal();
  return (
    <div className="absolute left-1/2 top-1/2 m-3 -translate-x-1/2 -translate-y-1/2">
      <Drawer
        show={show}
        className={className}
        position="center"
        transition="fade"
      >
        {children}
      </Drawer>
    </div>
  );
};

Panel.propTypes = {
  className: types.string,
};

const Close = ({ children, className, onClick = () => {} }) => {
  const { hideModal } = useModal();

  const handleClick = () => {
    onClick();
    hideModal();
  };

  return (
    <div
      className={className}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

Close.propTypes = {
  className: types.string,
};

const Modal = Object.assign(Root, { Tint, Body, Trigger, Panel, Close });
export default Modal;
