import { IPaymentBillingDetail } from './IPaymentBillingDetail.ts';

export interface IPaymentBilling {
  id?: string;
  policyNo?: string;
  planCode?: string;
  details?: IPaymentBillingDetail[];
}
