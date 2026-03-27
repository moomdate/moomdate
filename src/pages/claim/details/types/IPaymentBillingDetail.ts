import { INonCoverItem } from './INonCoverItem.ts';

export interface IPaymentBillingDetail {
  id?: string;
  billingItem?: string;
  chargeForCalculate?: number;
  rider?: string;
  benefit?: string;
  maxBenefit?: number;
  remaining?: number;
  nonCoverItem?: number;
  nonCover?: number;
  eligible?: number;
  percentCopay?: number;
  copay?: number;
  deduct?: number;
  paid?: number;
  exceed?: number;
  adjustExgratia?: number;
  exgratia?: number;
  subrogation?: number;
  receiveSubro?: number;
  nonCoverItems?: INonCoverItem[];
  isExpanded?: boolean;
}
