/* eslint-disable import/prefer-default-export */
import { v4 } from "uuid";

export function qr() {
  return "";
}

export function quiet() {
  return "";
}

export function escapeJavaScript(code: string) {
  // Appsync actually has it's own escape functionality which handles some characters differently
  return encodeURI(code);
}

export function urlEncode(url: string) {
  // Appsync also encodes the / character
  return escape(url).replace("/", "%2F");
}

export function urlDecode(url: string) {
  // Appsync also decodes the / character
  const urlWithSlash = url.replace("%2F", "/");
  return unescape(urlWithSlash);
}

export function base64Encode(data: string) {
  return Buffer.from(data).toString("base64");
}

export function base64Decode(buffer: string) {
  return Buffer.from(buffer, "base64").toString("ascii");
}

export function parseJson(json: string) {
  return JSON.parse(json);
}

export function toJson(obj: Object) {
  return JSON.stringify(obj);
}

export function autoId() {
  return v4();
}

export function unauthorized() {
  throw Error("Unauthorized");
}

export function error(message?: string) {
  // Whilst this function takes up to 4 inputs, it only throws the first input in the AWS AppSync resolver tester
  if (message) {
    throw Error(message);
  }
}

export function appendError() {
  // Does nothing as side-effects can't be handled by velocityjs - in practice this would add items to the errors array
}

export function validate(bool: Boolean, message?: string) {
  if (!bool) {
    throw new Error(message);
  }
  return "";
}

export function isNull(input?: any) {
  // Technically undefined returns null, however the javascript VTL tool then gets confused when this is used in
  // conditionals (the most common use case) so we'll keep the simple approach here.
  return input === null || typeof input === "undefined";
}

export function isNullOrEmpty(input?: any) {
  return !input;
}

export function isNullOrBlank(input?: any) {
  if (!input) {
    return true;
  }
  if (typeof input === "string" && input.match(/^[\n\t\r\s]*$/)) {
    return true;
  }
  return false;
}

export function defaultIfNull(obj: any, defaultObj: any) {
  if (obj === null || typeof obj === "undefined") {
    return defaultObj;
  }
  return obj;
}

export function defaultIfNullOrEmpty(obj: any, defaultObj: any) {
  if (!obj) {
    return defaultObj;
  }
  return obj;
}

export function defaultIfNullOrBlank(obj: any, defaultObj: any) {
  if (!obj) {
    return defaultObj;
  }
  if (typeof obj === "string" && obj.match(/^[\n\t\r\s]*$/)) {
    return defaultObj;
  }
  return obj;
}

export function isString(i: any) {
  return typeof i === "string";
}

export function isNumber(i: any) {
  return typeof i === "number";
}

export function isBoolean(i: any) {
  return typeof i === "boolean";
}

export function isList(i: any) {
  return Array.isArray(i);
}

export function isMap(i: any) {
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object for details as to why
  // this works
  return i === Object(i) && !Array.isArray(i) && typeof i === "object";
}

export function typeOf(i: any) {
  if (isNull(i)) {
    return "Null";
  }
  if (isNumber(i)) {
    return "Number";
  }
  if (isString(i)) {
    return "String";
  }
  if (isMap(i)) {
    return "Map";
  }
  if (isList(i)) {
    return "List";
  }
  if (isBoolean(i)) {
    return "Boolean";
  }
  return "Object";
}

export function matches(patternString: string, str: string) {
  const pattern = new RegExp(patternString);
  return !!str.match(pattern);
}
