export function toJSON(value: any) {
  if (typeof value === "object" && value != null && "toJSON" in value) {
    return value.toJSON();
  }
  return value;
}
