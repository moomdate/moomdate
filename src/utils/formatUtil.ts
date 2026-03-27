export function displayValue(value?: number | null): string {
  if (value === undefined || value === null) return '-';
  return String(value);
}

export function displayLocalValue(value?: number | null): string {
  if (value === undefined || value === null) return '-';
  return value.toLocaleString();
}

export function formatCurrency(value?: number | null): string {
  if (value === undefined || value === null) return '-';
  return value.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
