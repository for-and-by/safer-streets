import React from "react";
import InputWrapper from "~/components/elements/input-wrapper";

interface Props {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  name: string;
  error?: string | boolean;
}

export default function Select({
  label,
  options,
  onChange,
  value,
  name,
  error,
}: Props) {
  return (
    <InputWrapper label={label} name={name} error={error}>
      <select
        className="flex-grow appearance-none bg-transparent focus:outline-none"
        onChange={onChange}
        value={value}
        name={name}
      >
        <option disabled hidden value="">
          Please select...
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <i className="icon icon-down icon-sm absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" />
    </InputWrapper>
  );
}
