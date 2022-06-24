/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { isBoolean, isList, isNumber, isString } from "./util";

export function toString(str: string) {
  return { S: str };
}

export function toStringJson(str: string) {
  return JSON.stringify(toString(str));
}

export function toNumber(num: number) {
  return { N: num };
}

export function toNumberJson(num: number) {
  return JSON.stringify(toNumber(num));
}

export function toBoolean(bool: boolean) {
  return { BOOL: bool };
}

export function toBooleanJson(bool: boolean) {
  return JSON.stringify(toBoolean(bool));
}

export function toList(list: Array<any>) {
  return {
    L: list.map((item: any) => toDynamoDB(item)),
  };
}

export function toListJson(list: Array<any>) {
  return JSON.stringify(toList(list));
}

export function toMap(map: any) {
  const obj = JSON.parse(JSON.stringify(map));
  // eslint-disable-next-line array-callback-return
  Object.keys(obj).map((key) => {
    obj[key] = toDynamoDB(obj[key]);
  });

  return { M: obj };
}

export function toMapJson(map: any) {
  return JSON.stringify(toMap(map));
}

export function toDynamoDB(i: any): any {
  if (isString(i)) {
    return toString(i);
  }

  if (isNumber(i)) {
    return toNumber(i);
  }

  if (isBoolean(i)) {
    return toBoolean(i);
  }

  if (isList(i)) {
    return toList(i);
  }

  return toMap(i);
}

export function toDynamoDBJson(i: any) {
  return JSON.stringify(toDynamoDB(i));
}

export function toStringSetJson(list: Array<string>): {SS: Array<string>} {
  return { SS: list };
}

/**
 * The same as toMapJSON but only for the properties (the root obect becomes {a: {S: "s"}} rather than {M: {a: {S: "s"}}})
 */
export function toMapValues(map: any) {
  const obj = JSON.parse(JSON.stringify(map));
  // eslint-disable-next-line array-callback-return
  Object.keys(obj).map((key) => {
    obj[key] = toDynamoDB(obj[key]);
  });
  return obj;
}

export function toMapValuesJson(i: any) {
  return JSON.stringify(toMapValues(i));
}
