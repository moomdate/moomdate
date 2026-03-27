export type PercentCopayMap = Map<string, number>;

export function usePolicyCopayMap(): PercentCopayMap {
  return new Map<string, number>();
}
