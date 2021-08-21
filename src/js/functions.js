export function numberToLocaleString(string) {
  return string.toLocaleString("et-EE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
