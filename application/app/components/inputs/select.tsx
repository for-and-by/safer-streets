import type { ComponentProps } from "react";
import React, { forwardRef } from "react";

import Wrapper from "~/components/inputs/wrapper";
import type { FieldError } from "react-hook-form";

interface Props extends ComponentProps<"select"> {
  label: string;
  options?: {
    value: string;
    label: string;
  }[];
  loading?: boolean;
  placeholder?: string;
  error?: FieldError;
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, name, loading, placeholder, error, ...props }, ref) => {
    return (
      <Wrapper label={label} name={name} error={error}>
        <select
          className="flex-grow appearance-none bg-transparent focus:outline-none"
          name={name}
          {...props}
          ref={ref}
        >
          {loading ? (
            <option disabled hidden value="">
              {placeholder}
            </option>
          ) : (
            <option disabled hidden value="">
              Please select...
            </option>
          )}
          {options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        {loading ? (
          <i className="icon icon-is-spinning icon-circle-anim z-20 text-gray-700" />
        ) : (
          <i className="icon icon-down icon-sm absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" />
        )}
      </Wrapper>
    );
  }
);

Select.displayName = "Select";

export default Select;
