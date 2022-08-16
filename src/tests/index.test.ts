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

test("util.validate hides result if valid", () => {
  const vtl = `
  $util.validate(true, "Error")
  {}`;
  const parser = new Parser(vtl);
  const res = parser.resolve({});
  expect(res).toEqual({});
});

test("resolve with additional util", () => {
  const mockRdsToJsonObject = jest.fn();
  const rdsResult = "rds result text";
  mockRdsToJsonObject.mockImplementationOnce((args) => {
    return args === rdsResult ? [10] : [];
  });
  const additionalUtil = {
    rds: {
      toJsonObject: mockRdsToJsonObject,
    },
  };
  const vtl = `
  #set($response = $utils.rds.toJsonObject($ctx.result)[0])
  {"test": $response}`;
  const parser = new Parser(vtl);
  const res = parser.resolve({ result: rdsResult }, additionalUtil);
  expect(res).toEqual({ test: 10 });
});

test("#return can return an object early", () => {
  const vtl = `
  #return({"result": "A"})
  {"result": "B"}`;
  const parser = new Parser(vtl);
  const res = parser.resolve({});
  expect(res).toEqual({ result: "A" });
});

test("#return returns null if called without arguments", () => {
  const vtl = `
  #return()
  {"result": "B"}`;
  const parser = new Parser(vtl);
  const res = parser.resolve({});
  expect(res).toEqual(null);
});

describe("$context keeps full context data", () => {
  describe("$context.stash keeps data", () => {
    test("Keep initial data", () => {
      const vtl = "";
      const parser = new Parser(vtl);
      parser.resolve({
        stash: { key: "value" },
      });
      expect(parser.stash).toStrictEqual({ key: "value" });
    });

    test("Keep resolved data", () => {
      const vtl = '$ctx.stash.put("key", "value")';
      const parser = new Parser(vtl);
      parser.resolve({});
      expect(parser.stash).toStrictEqual({ key: "value" });
    });

    test("Keep resolved data with complex structures", () => {
      const vtl = `
        #set($nestedMap = {})
        $util.qr($nestedMap.put("nestedKey", "nestedValue"))
        $ctx.stash.put("key", $nestedMap)
      `;
      const parser = new Parser(vtl);
      parser.resolve({});
      expect(parser.stash).toStrictEqual({ key: { nestedKey: "nestedValue" } });
    });

    describe("Defaults if context is not defined", () => {
      test("Context defaults to an empty object", () => {
        const parser = new Parser("");
        expect(parser.context).not.toBeUndefined();
        expect(Object.keys(parser.context).length).toEqual(0);
      });

      test("Stash defaults to an empty object", () => {
        const parser = new Parser("");
        expect(parser.stash).not.toBeUndefined();
        expect(Object.keys(parser.stash).length).toEqual(0);
      });
    });
  });

  test("Keep argument modifications", () => {
    const vtl = `
      #set($ctx.args.original = "bar")
      #set($ctx.args.addition = "value")
    `;
    const parser = new Parser(vtl);
    parser.resolve({ arguments: { original: "foo" } });
    expect(parser.context.arguments).toStrictEqual({
      original: "bar",
      addition: "value",
    });
  });
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
