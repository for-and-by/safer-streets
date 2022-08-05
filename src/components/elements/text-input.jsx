import { forwardRef } from "react";
import types from "prop-types";

import clsx from "clsx";

// eslint-disable-next-line react/display-name
const TextInput = forwardRef(
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

TextInput.propTypes = {
  icon: types.string,
  loading: types.bool,
};

export default TextInput;
