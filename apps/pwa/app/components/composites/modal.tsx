import type { ComponentProps } from "react";
import { useState } from "react";

import { Portal } from "~/components/atoms/portal";

export function useModal(initial?: { isShow?: boolean }) {
  const [isShow, setIsShow] = useState(initial?.isShow ?? false);

  const actions = {
    hideModal: () => setIsShow(false),
    showModal: () => setIsShow(true),
  };

  return [isShow, actions] as const;
}

type TriggerProps = ComponentProps<"div"> & {
  onShow: () => void;
};

function Trigger(props: TriggerProps) {
  const { className, children, onShow } = props;
  return (
    <button className={className} onClick={onShow}>
      {children}
    </button>
  );
}

type BodyProps = ComponentProps<"div"> & {
  isShow: boolean;
};

function Body(props: BodyProps) {
  const { children, isShow } = props;
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

type TintProps = {
  onHide: () => void;
};

function Tint(props: TintProps) {
  const { onHide } = props;
  return <div onClick={onHide} className="absolute inset-0 bg-black/50" />;
}

type PropsPanel = ComponentProps<"div">;

function Panel(props: PropsPanel) {
  const { children, className } = props;
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

type CloseProps = ComponentProps<"button"> & {
  onHide: () => void;
};

function Close(props: CloseProps) {
  const { children, className, onHide } = props;
  return (
    <button className={className} onClick={onHide}>
      {children}
    </button>
  );
}

export const Modal = { Trigger, Body, Panel, Tint, Close };
