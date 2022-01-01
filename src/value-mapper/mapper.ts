import { JavaMap, createMapProxy } from "./map";
import { JavaArray } from "./array";
import { JavaString } from "./string";

function isPlainObject(value: any) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function valueMapper(value: any): any {
  if (value instanceof JavaMap) return value;
  if (value instanceof JavaArray) return value;
  if (Array.isArray(value)) {
    return new JavaArray(
      value.map((x) => valueMapper(x)),
      valueMapper
    );
  }
  if (isPlainObject(value)) {
    return createMapProxy(
      new JavaMap(
        Object.entries(value).reduce((sum, [k, v]) => {
          return {
            ...sum,
            [k]: valueMapper(v),
          };
        }, {}),
        valueMapper
      )
    );
  }

  if (typeof value === "string" && !((value as any) instanceof JavaString)) {
    return new JavaString(value);
  }

  // for now we don't handle number.
  return value;
}
