import {
  roundNum,
  minVal,
  maxVal,
  randomDouble,
  randomWithinRange,
} from "../util-math";

describe("util-math", () => {
  describe("roundNum()", () => {
    it("returns the value of a number rounded to the nearest integer", () => {
      expect(roundNum(-0.6)).toBe(-1);
      expect(roundNum(-0)).toBe(-0);
      expect(roundNum(0)).toBe(0);
      expect(roundNum(0.6)).toBe(1);
      expect(roundNum(2.4)).toBe(2);
      expect(roundNum(3)).toBe(3);
    });
  });

  describe("minVal()", () => {
    it("returns the smallest of the numbers given as input parameters", () => {
      expect(minVal(-0.4, -0.2)).toBe(-0.4);
      expect(minVal(-0, 0)).toBe(-0);
      expect(minVal(0, 0)).toBe(0);
      expect(minVal(-5, 2)).toBe(-5);
      expect(minVal(5, 2)).toBe(2);
    });

    it("returns 0 if there are no parameters", () => {
      expect(minVal()).toBe(0);
    });
  });

  describe("maxVal()", () => {
    it("returns the largest of the numbers given as input parameters", () => {
      expect(maxVal(-0.4, -0.2)).toBe(-0.2);
      expect(maxVal(-0, 0)).toBe(0);
      expect(maxVal(-5, 2)).toBe(2);
      expect(maxVal(5, 2)).toBe(5);
    });

    it("return 0 if there are no parameters", () => {
      expect(maxVal()).toBe(0);
    });
  });

  describe("randomDouble()", () => {
    Array.from(Array(50), () => randomDouble()).forEach(
      (randomNum: number, index, arr) => {
        const isWithinRange = randomNum > 0 && randomNum < 1;
        const isUnique = arr.lastIndexOf(randomNum) === index;

        it(`${randomNum} is larger than 0 and less than 1`, () => {
          expect(isWithinRange).toBe(true);
        });

        it(`${randomNum} did not result more than once`, () => {
          expect(isUnique).toBe(true);
        });
      }
    );
  });

  describe("randomWithinRange()", () => {
    const MIN = 25;
    const MAX = 4548412;
    Array.from(Array(50), () => randomWithinRange(MIN, MAX)).forEach(
      (randomNum: number, index, arr) => {
        const isWithinRange = randomNum > MIN && randomNum < MAX;
        const isUnique = arr.lastIndexOf(randomNum) === index;

        it(`${randomNum} is larger than ${MIN} and less than ${MAX}`, () => {
          expect(isWithinRange).toBe(true);
        });

        it(`${randomNum} did not result more than once`, () => {
          expect(isUnique).toBe(true);
        });
      }
    );
  });
});
