import React from "react";
import Wrapper from "~/components/inputs/wrapper";

interface Props {
  label: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name: string;
  value?: string;
  options?: {
    value: string;
    label: string;
  }[];
  loading?: boolean;
  placeholder?: string;
  error?: string | boolean;
}

export default function Select({
  label,
  options,
  onChange,
  value,
  name,
  loading,
  placeholder,
  error,
}: Props) {
  return (
    <Wrapper label={label} name={name} error={error}>
      <select
        className="flex-grow appearance-none bg-transparent focus:outline-none"
        onChange={onChange}
        value={value ?? ""}
        name={name}
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
        <i className="icon icon-is-spinning icon-circle-anim z-20 before:text-white" />
      ) : (
        <i className="icon icon-down icon-sm absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" />
      )}
    </Wrapper>
  );
}
