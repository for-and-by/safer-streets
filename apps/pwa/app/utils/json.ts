export function json<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("Couldn't not parse as JSON:", { value });
    return undefined;
  }
}

export function stringifyJSON(value?: object) {
  try {
    return value
      ? JSON.stringify(value, (key, value) => {
          if (value instanceof Set) {
            return {
              __type: "set",
              set: Array.from(value),
            };
          }
          if (value instanceof Map) {
            return {
              __type: "map",
              map: Object.fromEntries(value),
            };
          }
          return value;
        })
      : undefined;
  } catch (error) {
    console.log("Could not serialize JSON: ", value);
    return undefined;
  }
}

export function parseJSON(value?: string) {
  try {
    return value
      ? JSON.parse(value ?? "", (key, value) => {
          if (!(typeof value === "object" && value.hasOwnProperty("__type"))) {
            return value;
          }
          if (value.__type == "set") {
            return new Set(value.set);
          }
          if (value.__type == "map") {
            return new Map(Object.entries(value.map));
          }
          return value;
        })
      : undefined;
  } catch (error) {
    console.warn("Could not parse as JSON: ", value);
    console.warn(error);
    return undefined;
  }
}
