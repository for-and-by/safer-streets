import React from "react";
import clsx from "clsx";

interface Props extends React.ComponentPropsWithRef<"input"> {
  icon?: string;
  loading: boolean;
}

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ icon = undefined, loading = false, ...props }, ref) => (
    <div className="flex w-full overflow-hidden rounded border-base-200 bg-base-100 focus-within:outline focus-within:outline-brand-600">
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center">
          <i className={clsx(icon, "btn-icon")} />
        </div>
      )}
      <input
        type="text"
        className="flex-grow bg-transparent focus:outline-none"
        ref={ref}
        {...props}
      />
    </div>
  )
);

export default TextInput;
