import {
  nowISO8601,
  nowEpochSeconds,
  nowEpochMilliSeconds,
  nowFormatted,
  parseFormattedToEpochMilliSecond,
  parseISO8601ToEpochMilliSeconds,
  epochMilliSecondsToSeconds,
  epochMilliSecondsToISO8601,
  epochMilliSecondsToFormatted,
} from "../util-time";

test("nowISO8601", () => {
  const res = nowISO8601();
  expect(res).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
});

test("nowEpochSeconds", () => {
  const res = nowEpochSeconds();
  expect(res.toString().length).toBe(10);
});

test("nowEpochMilliSeconds", () => {
  const res = nowEpochMilliSeconds();
  expect(res.toString().length).toBe(13);
});

describe("nowFormatted", () => {
  test("format only", () => {
    const res = nowFormatted("yyyy-MM-dd HH:mm:ssZ");
    expect(res).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+\d{4}$/);
  });

  test("format and timezone", () => {
    const res = nowFormatted("yyyy-MM-dd HH:mm:ssZ", "Australia/Perth");
    expect(res).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+0800$/);
  });
});

describe("parseFormattedToEpochMilliSecond", () => {
  test("time and format", () => {
    const format = "yyyy-MM-ddTHH:mm:ssZ";
    const time = nowFormatted(format);
    const res = parseFormattedToEpochMilliSecond(time, format);
    expect(res.toString().length).toBe(13);
  });

  test("time and format and timezone", () => {
    const format = "yyyy-MM-ddTHH:mm:ssZ";
    const time = nowFormatted(format);
    const res = parseFormattedToEpochMilliSecond(
      time,
      format,
      "Australia/Perth"
    );
    expect(res.toString().length).toBe(13);
  });
});

test("parseISO8601ToEpochMilliSeconds", () => {
  const time = "2018-02-01T17:21:05.180+08:00";
  const res = parseISO8601ToEpochMilliSeconds(time);
  expect(res.toString().length).toBe(13);
});

test("epochMilliSecondsToSeconds", () => {
  const time = 1517943695750;
  const expected = 1517943695;
  const res = epochMilliSecondsToSeconds(time);
  expect(res).toBe(expected);
});

test("epochMilliSecondsToISO8601", () => {
  const time = 1517943695750;
  const expected = "2018-02-06T19:01:35.750Z";
  const res = epochMilliSecondsToISO8601(time);
  expect(res).toBe(expected);
});

describe("epochMilliSecondsToFormatted", () => {
  xtest("time & format", () => {
    const time = 1417943695859;
    const format = "yyyy-MM-dd HH:mm:ssZ";
    const expected = "2014-12-07 00:00:00+0000";
    const res = epochMilliSecondsToFormatted(time, format);
    expect(res).toBe(expected);
  });
});
