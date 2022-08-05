import types from "prop-types";

const ProgressBar = ({ value = 10 }) => {
  return (
    <div
      style={{ "--progress": `${value}%` }}
      className="block h-0.5 w-full bg-base-100">
      <div className="block h-full w-[var(--progress)] bg-brand-600 transition-all" />
    </div>
  );
};

ProgressBar.propTypes = {
  value: types.number,
};

export default ProgressBar;
