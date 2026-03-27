import { formatCurrency } from '@/utils/formatUtil.ts';
import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';

interface SettlementSummaryLeftProps {
  details?: IPaymentBillingDetail[];
  showDeletePlaceholder?: boolean;
}

function sumField(details: IPaymentBillingDetail[], field: keyof IPaymentBillingDetail): number {
  return details.reduce((sum, d) => sum + ((d[field] as number) ?? 0), 0);
}

export function SettlementSummaryLeft({
  details = [],
  showDeletePlaceholder,
}: SettlementSummaryLeftProps) {
  return (
    <tr style={{ height: '50px' }} className="bg-gray-100 font-semibold text-sm">
      {/* Billing Items (SIMB) */}
      <td
        className="border-t border-gray-300 bg-gray-100 px-3 py-2"
        style={{ minWidth: '200px' }}
      >
        Total
      </td>

      {/* Charge for Calculate */}
      <td
        className="border-t border-gray-300 bg-gray-100 px-3 py-2 text-right"
        style={{ minWidth: '160px' }}
      >
        {formatCurrency(sumField(details, 'chargeForCalculate'))}
      </td>

      {/* Rider */}
      <td
        className="border-t border-gray-300 bg-gray-100 px-3 py-2"
        style={{ minWidth: '110px' }}
      >
        -
      </td>

      {/* Delete column placeholder to keep alignment with data rows */}
      {showDeletePlaceholder && (
        <td className="border-t border-gray-300 bg-gray-100 px-3 py-2" />
      )}
    </tr>
  );
}
