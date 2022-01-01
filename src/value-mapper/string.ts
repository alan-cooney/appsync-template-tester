import { JavaArray } from "./array";

export class JavaString {
  value: string;

  constructor(str: any) {
    this.value = str;
  }

  concat(str: any) {
    return new JavaString(this.value.concat(str.toString()));
  }

  contains(str: any) {
    return this.value.indexOf(str.toString()) !== -1;
  }

  endsWith(suffix: any) {
    return this.value.endsWith(suffix.toString());
  }

  equals(str: any) {
    return this.value === str.toString();
  }

  indexOf(val: any, fromIndex = 0) {
    return this.value.indexOf(val.toString(), fromIndex);
  }

  isEmpty() {
    return this.value.length === 0;
  }

  lastIndexOf(val: any, fromIndex = Infinity) {
    return this.value.lastIndexOf(val.toString(), fromIndex);
  }

  replace(find: any, replace: any) {
    return this.replaceAll(find, replace);
  }

  replaceAll(find: any, replace: any) {
    const rep = this.value.replace(new RegExp(find, "g"), replace);
    return new JavaString(rep);
  }

  replaceFirst(find: any, replace: any) {
    const rep = this.value.replace(new RegExp(find), replace);
    return new JavaString(rep);
  }

  matches(regexString: any) {
    const re = new RegExp(regexString.toString());

    return this.value.match(re) !== null;
  }

  split(regexString: any, limit = undefined) {
    // WARNING: this assumes Java and JavaScript regular expressions are identical, according to
    // https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
    // this should be the case except for look-behind which is not implemented in JavaScript

    // java.util.String.split does not to include the separator in the result. JS does splice any capturing group
    // in the regex into the result. To remove the groups from the result we need the count of capturing groups in
    // the provided regex, the only way in JS seems to be via a match to an empty string
    const testRe = new RegExp(`${regexString.toString()}|`);
    const matches = "".match(testRe);
    const ngroups = matches ? matches.length : 0; // actually num of groups plus one, ie "" and the (empty) groups

    const re = new RegExp(regexString.toString());

    const result = this.value
      .split(re, limit)
      .filter((v, ii) => !(ii % ngroups));
    return new JavaArray(result, (e: any) => new JavaString(e.toString()));
  }

  startsWith(prefix: any, toffset = 0) {
    return this.value.startsWith(prefix.toString(), toffset);
  }

  substring(beginIndex: any, endIndex = Infinity) {
    return this.value.substring(beginIndex, endIndex);
  }

  toJSON() {
    return this.toString();
  }

  toLowerCase() {
    return new JavaString(this.value.toLowerCase());
  }

  toUpperCase() {
    return new JavaString(this.value.toUpperCase());
  }

  toString() {
    return this.value;
  }

  toIdString() {
    return this.value;
  }

  trim() {
    return new JavaString(this.value.trim());
  }

  length() {
    return this.value && this.value.length;
  }
}
