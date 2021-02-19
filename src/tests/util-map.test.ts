import { copyAndRemoveAllKeys, copyAndRetainAllKeys } from "../util-map";

test("copyAndRemoveAllKeys", () => {
  const map = {
    one: 1,
    two: 2,
    three: 3,
  };

  const list = ["one", "two"];

  const expected = {
    three: 3,
  };

  expect(copyAndRemoveAllKeys(map, list)).toMatchObject(expected);
});

test("copyAndRetailAllKeys", () => {
  const map = {
    one: 1,
    two: 2,
    three: 3,
  };

  const list = ["one", "two"];

  const expected = {
    one: 1,
    two: 2,
  };

  expect(copyAndRetainAllKeys(map, list)).toMatchObject(expected);
});
