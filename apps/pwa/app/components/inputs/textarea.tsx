import React from "react";
import Wrapper from "~/components/inputs/wrapper";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithRef<"textarea"> {
  icon?: string;
  label?: string;
  error?: FieldError;
}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ icon = undefined, label, name, error, ...props }, ref) => (
    <Wrapper label={label} name={name ?? ""} align="top" error={error}>
      {icon && <i className={`icon ${icon}`} />}
      <textarea
        className="flex-grow bg-transparent focus:outline-none"
        ref={ref}
        name={name}
        {...props}
      />
    </Wrapper>
  )
);

export default Textarea;
