import {
  createContext,
  useContext,
  Children,
  cloneElement,
  useState,
} from "react";

import types from "prop-types";
import { nanoid } from "nanoid";
import clsx from "clsx";

const TabsContext = createContext();
const TabsProvider = TabsContext.Provider;
const useTabs = () => useContext(TabsContext);

const Root = ({ children }) => {
  const [active, setActive] = useState(0);

  const value = {
    active,
    setActive,
  };

  return <TabsProvider value={value}>{children}</TabsProvider>;
};

const Items = ({ children, className = "" }) => {
  const { active, setActive } = useTabs();

  return (
    <div className={className}>
      {Children.map(Children.toArray(children), (child, index) =>
        cloneElement(child, {
          key: nanoid(),
          active: index === active,
          onClick: () => setActive(index),
          ...child.props,
        })
      )}
    </div>
  );
};

Items.propTypes = {
  className: types.string,
};

const Item = ({
  children,
  className = "",
  active = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={clsx(className, "hover:cursor-pointer")}
      onClick={onClick}
      data-active={active ? active : undefined}
    >
      {children}
    </div>
  );
};

Item.propTypes = {
  className: types.string,
  active: types.bool,
  onClick: types.func,
};

const Panels = ({ children, className = "" }) => {
  const { active } = useTabs();

  return (
    <div className={className}>
      {Children.map(Children.toArray(children), (child, index) =>
        cloneElement(child, {
          key: nanoid(),
          active: index === active,
          ...child.props,
        })
      )}
    </div>
  );
};

Panels.propTypes = {
  className: types.string,
};

const Panel = ({ children, className = "", active = false }) => {
  return <div className={clsx(className, !active && "hidden")}>{children}</div>;
};

Panel.propTypes = {
  className: types.string,
  active: types.bool,
};

const Tabs = Object.assign(Root, { Items, Item, Panels, Panel });

export default Tabs;
