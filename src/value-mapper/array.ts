import { toJSON } from "./to-json";

export class JavaArray extends Array<any> {
  private mapper: Function;

  constructor(values: any, mapper: Function) {
    let val = values;
    if (!Array.isArray(values)) {
      // splice sends a single object
      val = [values];
    }
    if (val.length !== 1) {
      super(...val);
    } else {
      super();
      this.push(val[0]);
    }
    Object.setPrototypeOf(this, Object.create(JavaArray.prototype));
    this.mapper = mapper;
  }

  add(value: any) {
    this.push(this.mapper(value));
    return value;
  }

  addAll(value: any) {
    value.forEach((val: any) => this.push(this.mapper(val)));
  }

  clear() {
    this.length = 0;
  }

  contains(value: any) {
    const val = value && value.toJSON ? value.toJSON() : value;
    return this.toJSON().indexOf(val) !== -1;
  }

  containsAll(value: Array<any> = []) {
    return value.every((v) => this.contains(v));
  }

  isEmpty() {
    return this.length === 0;
  }

  remove(value: any) {
    const idx = this.indexOf(value);
    if (idx === -1) return;
    this.splice(idx, 1);
  }

  removeAll(value: any) {
    const self = this;
    value.forEach((val: any) => self.remove(val));
  }

  size() {
    return this.length;
  }

  toJSON() {
    return Array.from(this).map(toJSON);
  }
}
