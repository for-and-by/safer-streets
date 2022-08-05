import { Map } from "iconoir-react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <i className="ri-map-2-fill icon-sm text-brand-600" />
      <h1 className="text-base font-semibold text-base-900">Safer Streets</h1>
    </div>
  );
};

Logo.propTypes = {};

export default Logo;
