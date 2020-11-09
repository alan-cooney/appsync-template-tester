/* eslint-disable import/prefer-default-export */
import moment from "moment-timezone";

/**
 * Helper function to convert the format string from the vtl format to the moment format
 */
function vtlToMomentFormat(format?: string) {
  return format?.replace("dd", "DD").replace("Z", "ZZ");
}

export function nowISO8601() {
  return moment.utc().toISOString();
}

export function nowEpochSeconds() {
  return moment().unix();
}

export function nowEpochMilliSeconds() {
  return moment().valueOf();
}

export function nowFormatted(format: string, timezone: string = "utc") {
  const vtlFormatConverted = vtlToMomentFormat(format);
  return moment().tz(timezone).format(vtlFormatConverted);
}

export function parseFormattedToEpochMilliSecond(
  time: string,
  formatFrom: string,
  timezone: string = "utc"
) {
  const reverseFormat = vtlToMomentFormat(formatFrom);
  // AppSync does not parse in strict mode
  return moment(time, reverseFormat).tz(timezone).valueOf();
}

export function parseISO8601ToEpochMilliSeconds(time: string) {
  // AppSync does not parse in strict mode
  return moment(time, "YYYY-MM-DDTHH:mm:ssZ").valueOf();
}

export function epochMilliSecondsToSeconds(time: number) {
  return moment(time).unix();
}

export function epochMilliSecondsToISO8601(time: number) {
  return moment(time).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
}

export function epochMilliSecondsToFormatted(
  time: number,
  format?: string,
  timezone: string = "utc"
) {
  const vtlFormatConverted = vtlToMomentFormat(format);
  return moment(time).tz(timezone).format(vtlFormatConverted);
}
