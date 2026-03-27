export type UnitCodeMap = Map<string, string>;

export const COVERAGE_UNIT_MAP: UnitCodeMap = new Map([
  ['B', 'บาท'],
  ['%', 'เปอร์เซ็นต์'],
  ['D', 'วัน'],
  ['T', 'ครั้ง'],
]);

export const MAX_COVERAGE_UNIT_MAP: UnitCodeMap = new Map([
  ['B', 'บาท/ปี'],
  ['%', 'เปอร์เซ็นต์/ปี'],
  ['D', 'วัน/ปี'],
  ['T', 'ครั้ง/ปี'],
]);
