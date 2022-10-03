import {
  Children,
  cloneElement,
  ComponentProps,
  createContext,
  Dispatch,
  isValidElement,
  SetStateAction,
  useState,
} from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";

import createContextHook from "~/hooks/factories/create-context-hook";

interface ContextValue {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const initialValue: ContextValue = {
  activeTab: 0,
  setActiveTab: () => null,
};

const TabsContext = createContext(initialValue);
const useTabs = createContextHook({ TabsContext });

interface PropsRoot extends ComponentProps<"div"> {}

function Root({ children }: PropsRoot) {
  const { activeTab: _activeTab } = initialValue;
  const [activeTab, setActiveTab] = useState(_activeTab);

  const value: ContextValue = {
    activeTab,
    setActiveTab,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

interface PropsItems extends ComponentProps<"div"> {}

function Items({ children, className = "" }: PropsItems) {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            key: nanoid(),
            active: index === activeTab,
            onClick: () => setActiveTab(index),
            ...child.props,
          });
        }
      })}
    </div>
  );
}

interface PropsItem extends ComponentProps<"button"> {
  active?: boolean;
}

function Item({
  children,
  className = "",
  active = false,
  onClick = () => {},
}: PropsItem) {
  return (
    <button
      className={clsx(className, "hover:cursor-pointer")}
      onClick={onClick}
      data-active={active ? active : undefined}
    >
      {children}
    </button>
  );
}

interface PropsPanels extends ComponentProps<"div"> {}

function Panels({ children, className = "" }: PropsPanels) {
  const { activeTab } = useTabs();

  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            key: nanoid(),
            active: index === activeTab,
            ...child.props,
          });
        }
      })}
    </div>
  );
}

interface PropsPanel extends ComponentProps<"div"> {
  active?: boolean;
}

function Panel({ children, className = "", active = false }: PropsPanel) {
  return <div className={clsx(className, !active && "hidden")}>{children}</div>;
}

const Tabs = Object.assign(Root, { Items, Item, Panels, Panel });

export default Tabs;
