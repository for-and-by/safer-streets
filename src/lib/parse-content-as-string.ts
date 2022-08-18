import { ContextItem, ContextObject } from "~/types/search";

export default function parseContextAsString(context: ContextItem[]) {
  const contextObj = context.reduce((obj, feature) => {
    if (feature?.id) {
      const [type, id] = feature.id.split(".");
      return Object.assign(obj, {
        [type]: {
          ...feature,
          type,
          id,
        },
      });
    } else {
      return obj;
    }
  }, {} as ContextObject);

  return [
    contextObj?.street?.text ??
      contextObj?.subcity?.text ??
      contextObj.place?.text ??
      null,
    contextObj?.state?.text ?? null,
    contextObj?.country?.text ?? null,
    contextObj?.postcode?.text ?? null,
  ]
    .filter((i) => !!i)
    .join(", ");
}
