export function roundNum(num?: number) {
  return Math.round(num ?? 0);
}

export function minVal(numA?: number, numB?: number) {
  return Math.min(numA ?? 0, numB ?? 0);
}

export function maxVal(numA?: number, numB?: number) {
  return Math.max(numA ?? 0, numB ?? 0);
}

export function randomDouble() {
  return Math.random();
}

export function randomWithinRange(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
