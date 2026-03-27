import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';

export class SettlementUtils {
  static calculateEligible(detail: IPaymentBillingDetail): number {
    const charge = detail.chargeForCalculate ?? 0;
    const nonCover = detail.nonCover ?? 0;
    return Math.max(0, charge - nonCover);
  }

  static calculatePaid(detail: IPaymentBillingDetail): number {
    const eligible = SettlementUtils.calculateEligible(detail);
    const copay = detail.copay ?? 0;
    const deduct = detail.deduct ?? 0;
    return Math.max(0, eligible - copay - deduct);
  }

  static calculateExceed(detail: IPaymentBillingDetail): number {
    const paid = SettlementUtils.calculatePaid(detail);
    const maxBenefit = detail.maxBenefit ?? 0;
    if (maxBenefit <= 0) return 0;
    return Math.max(0, paid - maxBenefit);
  }

  static sumField(
    details: IPaymentBillingDetail[],
    field: keyof IPaymentBillingDetail,
  ): number {
    return details.reduce((sum, d) => sum + ((d[field] as number) ?? 0), 0);
  }
}
