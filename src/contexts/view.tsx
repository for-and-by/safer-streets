import { VIEWS } from "~/types/view";
import React from "react";
import createContextHook from "~/hooks/create-context-hook";

interface ContextValue {
  activeView: VIEWS;
  setView: (view: VIEWS) => void;
  resetView: () => void;
}

interface Props extends React.ComponentProps<"div"> {}

const initialValue: ContextValue = {
  activeView: VIEWS.HOME,
  setView: () => {},
  resetView: () => {},
};

export const ViewContext = React.createContext(initialValue);
export const useViewContext = createContextHook({ ViewContext });

export default function ViewProvider({ children }: Props) {
  const { activeView: _activeView } = initialValue;
  const [activeView, setActiveView] =
    React.useState<ContextValue["activeView"]>(_activeView);

  const resetView = React.useCallback(() => {
    setActiveView(VIEWS.HOME);
  }, [setActiveView]);

  const value: ContextValue = {
    activeView: activeView,
    setView: setActiveView,
    resetView: resetView,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
