import React from "react";

import type { FieldError } from "react-hook-form";

import Wrapper from "~/components/inputs/wrapper";

interface Props extends React.ComponentPropsWithRef<"input"> {
  icon?: string;
  label?: string;
  error?: FieldError;
}

// eslint-disable-next-line react/display-name
const Text = React.forwardRef<HTMLInputElement, Props>(
  ({ icon = undefined, label, name, error, ...props }, ref) => (
    <Wrapper label={label} name={name} error={error}>
      {icon && <i className={`icon ${icon}`} />}
      <input
        type="text"
        className="flex-grow bg-transparent focus:outline-none"
        ref={ref}
        name={name}
        {...props}
      />
    </Wrapper>
  )
);

export default Text;
