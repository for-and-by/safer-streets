import types from "prop-types";
import clsx from "clsx";

const Drawer = ({
  className = "",
  show = true,
  position = "bottom",
  transition = "slide",
  scrollable = false,
  children,
}) => {
  return (
    <div
      className={clsx(
        "clamp transition-full z-10 flex flex-col overflow-hidden bg-white shadow-md",
        position === "bottom" && "rounded-t",
        position === "top" && "rounded-b",
        position === "center" && "rounded",
        show && "pointer-events-auto",
        !show && "pointer-events-none",
        show &&
          transition === "slide" &&
          "max-h-96 delay-500 duration-500 ease-in-out",
        !show && transition === "slide" && "max-h-0 duration-500 ease-in",
        show && transition === "fade" && "opacity-1",
        !show && transition === "fade" && "opacity-0",
        scrollable && "max-h-80 overflow-y-scroll",
        className
      )}
    >
      {children}
    </div>
  );
};

Drawer.propTypes = {
  show: types.bool,
  position: types.oneOf(["top", "bottom", "center"]),
  transition: types.oneOf(["slide", "fade"]),
  className: types.string,
};

const Row = ({ sticky = false, className = "", children }) => {
  return (
    <div
      className={clsx(
        "flex flex-row items-center space-x-1 bg-white",
        sticky && "sticky top-0",
        className
      )}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  sticky: types.bool,
  className: types.string,
};

const Tint = ({ show = false }) => (
  <div
    className={clsx("absolute inset-0 bg-base-900/75", !show && "opacity-0")}
  />
);

Tint.propTypes = {
  show: types.bool,
};

Drawer.Row = Row;
Drawer.Tint = Tint;

export default Drawer;
