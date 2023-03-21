import { parseJSON, stringifyJSON } from "~/utils/json";
import type { PersistStorage } from "zustand/middleware";

export function createSerializableStorage<State>(): PersistStorage<State> {
  return {
    getItem: (name) => {
      let state = { state: {} } as { state: State };
      const storedItem = localStorage.getItem(name);
      if (storedItem) state = parseJSON(storedItem);
      return state;
    },
    setItem: (name, newValue) => {
      const storedItem = stringifyJSON(newValue);
      if (storedItem) localStorage.setItem(name, storedItem);
    },
    removeItem: (name) => localStorage.removeItem(name),
  };
}
