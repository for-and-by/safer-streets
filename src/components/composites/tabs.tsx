import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  useState,
  ReactElement,
} from "react";

import { nanoid } from "nanoid";
import clsx from "clsx";
import { createContextHook } from "~/lib/helpers";

interface Props {
  Root: {
    children?: React.ReactNode;
  };
  Items: {
    children?: React.ReactNode;
    className: string;
  };
  Item: {
    children?: React.ReactNode;
    className: string;
    active: boolean;
    onClick: () => void;
  };
  Panels: {
    children?: React.ReactNode;
    className: string;
  };
  Panel: {
    children?: React.ReactNode;
    className: string;
    active: boolean;
  };
}

interface TabsContextValue {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const TabsContext = React.createContext<TabsContextValue>({
  active: 0,
  setActive: () => null,
});

const useTabs = createContextHook<TabsContextValue>({ TabsContext });

function Root({ children }: Props["Root"]) {
  const [active, setActive] = useState<number>(0);

  const value: TabsContextValue = {
    active,
    setActive,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function Items({ children, className = "" }: Props["Items"]) {
  const { active, setActive } = useTabs();

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            key: nanoid(),
            active: index === active,
            onClick: () => setActive(index),
            ...child.props,
          });
        }
      })}
    </div>
  );
}

function Item({
  children,
  className = "",
  active = false,
  onClick = () => {},
}: Props["Item"]) {
  return (
    <div
      className={clsx(className, "hover:cursor-pointer")}
      onClick={onClick}
      data-active={active ? active : undefined}
    >
      {children}
    </div>
  );
}

const Panels = ({ children, className = "" }: Props["Panels"]) => {
  const { active } = useTabs();

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            key: nanoid(),
            active: index === active,
            ...child.props,
          });
        }
      })}
    </div>
  );
};

const Panel = ({
  children,
  className = "",
  active = false,
}: Props["Panel"]) => {
  return <div className={clsx(className, !active && "hidden")}>{children}</div>;
};

const Tabs = Object.assign(Root, { Items, Item, Panels, Panel });

export default Tabs;
