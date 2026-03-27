import { formatCurrency } from '@/utils/formatUtil.ts';
import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';
import { ColumnDisplayConfig } from '../config/columnDisplayConfig.ts';
import Conditional from '@pages/claim/details/components/settlement/component/Conditional.tsx';

interface SettlementSummaryProps {
  details?: IPaymentBillingDetail[];
  columnDisplay?: ColumnDisplayConfig;
}

function sumField(details: IPaymentBillingDetail[], field: keyof IPaymentBillingDetail): number {
  return details.reduce((sum, d) => sum + ((d[field] as number) ?? 0), 0);
}

/**
 * @deprecated Use SettlementSummaryLeft + SettlementSummaryRight instead.
 * This is the original single-table summary row kept for reference.
 */
export function SettlementSummary({ details = [], columnDisplay }: SettlementSummaryProps) {
  const { displayRemaining, isCopay, isDeduct } = columnDisplay ?? {};

  return (
    <tr style={{ height: '50px' }} className="bg-gray-100 font-semibold text-sm">
      {/* Billing Items — sticky in original single-table */}
      <td
        className="sticky left-0 z-10 border-t border-gray-300 bg-gray-100 px-3 py-2"
        style={{ minWidth: '200px' }}
      >
        Total
      </td>
      <td
        className="sticky left-[200px] z-10 border-t border-gray-300 bg-gray-100 px-3 py-2 text-right"
        style={{ minWidth: '160px' }}
      >
        {formatCurrency(sumField(details, 'chargeForCalculate'))}
      </td>
      <td
        className="sticky left-[360px] z-10 border-t border-gray-300 bg-gray-100 px-3 py-2"
        style={{ minWidth: '110px' }}
      >
        -
      </td>

      {/* Benefit */}
      <td className="border-t border-gray-300 px-3 py-2" style={{ minWidth: '130px' }}>-</td>

      {/* Max Benefit */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '190px' }}>
        {formatCurrency(sumField(details, 'maxBenefit'))}
      </td>

      {/* Remaining */}
      <Conditional condition={displayRemaining}>
        <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '190px' }}>
          {formatCurrency(sumField(details, 'remaining'))}
        </td>
      </Conditional>

      {/* Non cover Item */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '170px' }}>
        {formatCurrency(sumField(details, 'nonCoverItem'))}
      </td>

      {/* Non-cover */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '170px' }}>
        {formatCurrency(sumField(details, 'nonCover'))}
      </td>

      {/* Eligible */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '140px' }}>
        {formatCurrency(sumField(details, 'eligible'))}
      </td>

      {/* Percent Copay */}
      <Conditional condition={isCopay}>
        <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '140px' }}>
          -
        </td>
      </Conditional>

      {/* Co-pay */}
      <Conditional condition={isCopay}>
        <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
          {formatCurrency(sumField(details, 'copay'))}
        </td>
      </Conditional>

      {/* Deduct */}
      <Conditional condition={isDeduct}>
        <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
          {formatCurrency(sumField(details, 'deduct'))}
        </td>
      </Conditional>

      {/* Paid */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
        {formatCurrency(sumField(details, 'paid'))}
      </td>

      {/* Exceed */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
        {formatCurrency(sumField(details, 'exceed'))}
      </td>

      {/* Adjust exgratia */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
        {formatCurrency(sumField(details, 'adjustExgratia'))}
      </td>

      {/* Exgratia */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
        {formatCurrency(sumField(details, 'exgratia'))}
      </td>

      {/* Subrogation */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
        {formatCurrency(sumField(details, 'subrogation'))}
      </td>

      {/* Receive Subro */}
      <td className="border-t border-gray-300 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
        {formatCurrency(sumField(details, 'receiveSubro'))}
      </td>
    </tr>
  );
}
