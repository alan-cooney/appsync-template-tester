import { JavaArray } from "./array";
import { toJSON } from "./to-json";

export function createMapProxy(map: any) {
  return new Proxy(map, {
    get(obj, prop) {
      if (map.map.has(prop)) {
        return map.get(prop);
      }
      return map[prop];
    },
    set(obj, prop, val) {
      if (typeof val !== "function") {
        map.map.set(prop, val);
      }
      return true;
    },
  });
}

export class JavaMap {
  private map: Map<string, any>;

  private mapper: Function;

  constructor(obj: any, mapper: Function) {
    this.mapper = mapper;
    this.map = new Map();
    Object.entries(obj).forEach(([key, value]) => {
      this.map.set(key, value);
    });
  }

  clear() {
    this.map.clear();
  }

  containsKey(key: any) {
    return this.map.has(key);
  }

  containsValue(value: any) {
    return Array.from(this.map.values()).indexOf(value) !== -1;
  }

  entrySet() {
    const entries = Array.from(this.map.entries()).map(([key, value]) =>
      createMapProxy(
        new JavaMap(
          {
            key,
            value,
          },
          this.mapper
        )
      )
    );

    return new JavaArray(entries, this.mapper);
  }

  equals(value: any) {
    return Array.from(this.map.entries()).every(
      ([key, v]) => value.get(key) === v
    );
  }

  get(key: any) {
    if (this.map.has(key.toString())) {
      return this.map.get(key.toString());
    }
    return null;
  }

  isEmpty() {
    return this.map.size === 0;
  }

  keySet() {
    return new JavaArray(
      Array.from(this.map.keys()).map(this.mapper as any),
      this.mapper
    );
  }

  put(key: any, value: any) {
    const saveValue = this.mapper(value);
    this.map.set(key, saveValue);
    return saveValue;
  }

  putAll(map: object | JavaMap) {
    const m = toJSON(map);
    Object.entries(m).forEach(([key, value]) => {
      this.put(key, value);
    });
  }

  remove(key: any) {
    if (!this.map.has(key)) {
      return null;
    }
    const value = this.map.get(key);
    this.map.delete(key);
    return value;
  }

  size() {
    return this.map.size;
  }

  values() {
    return new JavaArray(Array.from(this.map.values()), this.mapper);
  }

  toJSON() {
    return Array.from(this.map.entries()).reduce(
      (sum, [key, value]) => ({
        ...sum,
        [key]: toJSON(value),
      }),
      {}
    );
  }
}
