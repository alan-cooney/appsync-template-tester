import {
  toString,
  toNumber,
  toBoolean,
  toList,
  toMap,
  toDynamoDB,
  toStringJson,
  toNumberJson,
  toBooleanJson,
  toListJson,
  toMapJson,
  toMapValues,
  toMapValuesJson,
} from "../util-dynamodb";

/**
 * Example responses from:
 * https://docs.aws.amazon.com/appsync/latest/devguide/resolver-util-reference.html#dynamodb-helpers-in-util-dynamodb
 */

describe("string", () => {
  const i = "foo";
  const expected = { S: "foo" };

  test("toString", () => {
    const res = toString(i);
    expect(res).toEqual(expected);
  });

  test("toStringJson", () => {
    const res = toStringJson(i);
    expect(JSON.parse(res)).toEqual(expected);
  });

  test("toDynamoDB", () => {
    const res = toDynamoDB(i);
    expect(res).toEqual(expected);
  });
});

describe("number", () => {
  const i = 12345;
  const expected = { N: "12345" };

  test("toNumber", () => {
    const res = toNumber(i);
    expect(res).toEqual(expected);
  });

  test("toNumberJson", () => {
    const res = toNumberJson(i);
    expect(JSON.parse(res)).toEqual(expected);
  });

  test("toDynamoDB", () => {
    const res = toDynamoDB(i);
    expect(res).toEqual(expected);
  });
});

describe("boolean", () => {
  const i = true;
  const expected = { BOOL: true };

  test("toBoolean", () => {
    const res = toBoolean(i);
    expect(res).toEqual(expected);
  });

  test("toBooleanJson", () => {
    const res = toBooleanJson(i);
    expect(JSON.parse(res)).toEqual(expected);
  });

  test("toDynamoDB", () => {
    const res = toDynamoDB(i);
    expect(res).toEqual(expected);
  });
});

describe("list", () => {
  const i = ["foo", 123, { bar: "baz" }];
  const expected = {
    L: [
      { S: "foo" },
      { N: "123" },
      {
        M: {
          bar: { S: "baz" },
        },
      },
    ],
  };

  test("toList", () => {
    const res = toList(i);
    expect(res).toEqual(expected);
  });

  test("toListJson", () => {
    const res = toListJson(i);
    expect(JSON.parse(res)).toEqual(expected);
  });

  test("toDynamoDB", () => {
    const res = toDynamoDB(i);
    expect(res).toEqual(expected);
  });
});

describe("map", () => {
  const i = { foo: "bar", baz: 1234, beep: ["boop"] };
  const expected = {
    M: {
      foo: { S: "bar" },
      baz: { N: "1234" },
      beep: {
        L: [{ S: "boop" }],
      },
    },
  };

  test("toMap", () => {
    const res = toMap(i);
    expect(res).toEqual(expected);
  });

  test("toMapJson", () => {
    const res = toMapJson(i);
    expect(JSON.parse(res)).toEqual(expected);
  });

  test("toDynamoDB", () => {
    const res = toDynamoDB(i);
    expect(res).toEqual(expected);
  });

  test("toMapValues", () => {
    const res = toMapValues(i);
    expect(res).toEqual(expected.M);
  });

  test("toMapValuesJson", () => {
    const res = toMapValuesJson(i);
    expect(JSON.parse(res)).toEqual(expected.M);
  });
});
