import Parser from "../index";

test("Simple vtl returns correctly", () => {
  const vtl = '$utils.toJson({"test": true})';
  const parser = new Parser(vtl);
  const result = parser.resolve({});
  expect(result).toEqual({ test: true });
});

test("util.qr hides result", () => {
  const vtl = `
  #set($array = [])
  $util.qr($array.add(1))
  {"test": $array}`;
  const parser = new Parser(vtl);
  const res = parser.resolve({});
  expect(res).toEqual({ test: [1] });
  // expect(res.includes('$util.qr($array.add("element in array"))')).toBeFalsy();
});

test("util.quiet hides result", () => {
  const vtl = `
  #set($array = [])
  $util.quiet($array.add(1))
  {"test": $array}`;
  const parser = new Parser(vtl);
  const res = parser.resolve({});
  expect(res).toEqual({ test: [1] });
});

describe("Typecasting works as expected", () => {
  test("Boolean false", () => {
    const vtl = "\nfalse "; // Note surrounding whitespace should be ignored
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toBe(false);
  });

  test("Boolean true", () => {
    const vtl = "true";
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toBe(true);
  });

  test("Null", () => {
    const vtl = "null";
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toBe(null);
  });

  test("Integer", () => {
    const vtl = "123";
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toBe(123);
  });

  test("Float", () => {
    const vtl = "123.456";
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toBe(123.456);
  });

  test("JSON", () => {
    const vtl = '{"test": true}';
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toEqual({ test: true });
  });

  test("Array", () => {
    const vtl = "[1,2,3]";
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toEqual([1, 2, 3]);
  });

  test("String", () => {
    const vtl = "abc123";
    const parser = new Parser(vtl);
    const res = parser.resolve({});
    expect(res).toBe("abc123");
  });
});
