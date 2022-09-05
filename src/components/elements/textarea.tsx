import React from "react";
import clsx from "clsx";
import InputWrapper from "~/components/elements/input-wrapper";

interface Props extends React.ComponentPropsWithRef<"textarea"> {
  icon?: string;
  loading?: boolean;
  label?: string;
}

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ icon = undefined, loading = false, label, name, ...props }, ref) => (
    <InputWrapper label={label} name={name ?? ""} align="top">
      {icon && <i className={clsx("icon", icon)} />}
      <textarea
        className="flex-grow bg-transparent focus:outline-none"
        ref={ref}
        {...props}
      />
    </InputWrapper>
  )
);

export default TextInput;
