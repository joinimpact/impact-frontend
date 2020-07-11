export function normalizeNumber(value: string | undefined): number | undefined {
  return typeof(value) === 'string' ? parseInt(value, 10) : value;
}
