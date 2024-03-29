import { useEffect, useState } from "react";

import useDebounce from "~/hooks/use-debounce";
import { Portal } from "~/components/atoms/portal";
import { useTimeout } from "~/hooks/use-timeout";

const REGION_ID = "toasts";

interface PropsRoot {
  show?: boolean;
  content: string;
}

function Default({ show = false, content }: PropsRoot) {
  const debouncedShow = useDebounce(show, 150);
  if (!debouncedShow) return null;

  return (
    <Portal selector={`#${REGION_ID}`}>
      <div
        data-visible={show}
        className="
          pointer-events-none flex
          items-center gap-4 rounded
          bg-base-900 p-4 text-base-50 opacity-0 transition-all
          data-visible:pointer-events-auto data-visible:opacity-100
        "
      >
        <i className="icon icon-is-spinning icon-spinner z-20 before:text-white" />
        <p className="text-sm">{content}</p>
      </div>
    </Portal>
  );
}

interface PropsError {
  content?: string;
}

function Error({ content }: PropsError) {
  const [show, setShow] = useState(false);
  const debouncedShow = useDebounce(show, 150);

  useEffect(() => {
    setShow(!!content);
  }, [content]);

  useTimeout(
    () => {
      if (show) setShow(false);
    },
    2000,
    [show]
  );

  if (!debouncedShow) return null;

  return (
    <Portal selector={`#${REGION_ID}`}>
      <div
        data-visible={show}
        className="
          pointer-events-none flex
          items-center gap-4 rounded
          bg-base-600 p-4 text-base-50 opacity-0 transition-all
          data-visible:pointer-events-auto data-visible:opacity-100
        "
      >
        <p className="text-sm font-bold">Error</p>
        <p className="text-sm">{content}</p>
        <button className="btn btn-icon" onClick={() => setShow(false)}>
          <i className="btn-icon icon icon-close z-20 before:text-white" />
        </button>
      </div>
    </Portal>
  );
}

function Container() {
  return (
    <div
      id={REGION_ID}
      className="inline-flex flex-col justify-end space-y-2"
    />
  );
}

const Toast = Object.assign(Default, { Container, Error });

export default Toast;
