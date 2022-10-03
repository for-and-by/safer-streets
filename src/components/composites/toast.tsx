import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import useDebounce from "~/hooks/use-debounce";

const TOAST_ID = "toasts";

interface PropsRoot {
  show?: boolean;
  content: string;
}

function Root({ show = false, content }: PropsRoot) {
  const containerRef = useRef<HTMLElement | null>(null);
  const debouncedShow = useDebounce(show, 150);

  useEffect(() => {
    if (!containerRef?.current) {
      containerRef.current = document.querySelector(`#${TOAST_ID}`);
    }
  }, []);

  if (!debouncedShow || !containerRef?.current) return null;

  return createPortal(
    <div
      className={clsx(
        "flex items-center space-x-4 rounded bg-base-900 p-4 text-base-50 transition-all",
        show ? "opacity-1 pointer-events-auto" : "pointer-events-none opacity-0"
      )}
    >
      <i className="icon icon-is-spinning icon-circle-anim z-20 before:text-white" />
      <p className="text-sm">{content}</p>
    </div>,
    containerRef.current
  );
}

function Container() {
  return (
    <div id={TOAST_ID} className="inline-flex flex-col justify-end space-y-2" />
  );
}

const Toast = Object.assign(Root, { Container });

export default Toast;
