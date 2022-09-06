import React from "react";
import clsx from "clsx";
import InputWrapper from "~/components/elements/input-wrapper";

interface Props extends React.ComponentPropsWithRef<"input"> {
  icon?: string;
  loading?: boolean;
  label?: string;
  error?: string | boolean;
}

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    { icon = undefined, loading = false, label, name, error, ...props },
    ref
  ) => (
    <InputWrapper label={label} name={name} error={error}>
      {icon && <i className={clsx("icon", icon)} />}
      <input
        type="text"
        className="flex-grow bg-transparent focus:outline-none"
        ref={ref}
        name={name}
        {...props}
      />
    </InputWrapper>
  )
);

export default TextInput;
