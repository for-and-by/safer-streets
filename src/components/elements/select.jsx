import types from "prop-types";

const Select = ({ label, options, onChange, value, name }) => {
  return (
    <div className="relative flex w-full space-x-2 rounded-sm bg-gray-100 px-2 focus-within:outline focus-within:outline-brand-400">
      <label
        className="w-16 py-2 font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        className="flex-grow appearance-none bg-transparent py-2 focus:outline-none"
        onChange={onChange}
        value={value}
        name={name}
      >
        <option
          disabled
          hidden
          value=""
        >
          Please select...
        </option>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      <i className="ri-arrow-down-s-line icon-sm absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" />
    </div>
  );
};

Select.propTypes = {
  label: types.string,
  options: types.arrayOf(
    types.shape({ value: types.string, label: types.string })
  ),
  onChange: types.func,
  value: types.string,
  name: types.string,
};

export default Select;
