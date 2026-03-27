import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';
import { IPaymentBilling } from '@pages/claim/details/types/IPaymentBilling.ts';
import { useCallback, useState } from 'react';
import { PercentCopayMap } from '@pages/claim/details/components/settlement/hook/usePolicyCopayMap.ts';
import {
  ColumnDisplayConfig,
  RowConditionConfig,
} from './config/columnDisplayConfig.ts';
import { SettlementRowLeft } from './components/SettlementRowLeft.tsx';
import { SettlementRowRight } from './components/SettlementRowRight.tsx';
import { SettlementSummaryLeft } from './components/SettlementSummaryLeft.tsx';
import { SettlementSummaryRight } from './components/SettlementSummaryRight.tsx';
import Conditional from '@pages/claim/details/components/settlement/component/Conditional.tsx';

interface SettlementTableProps {
  isEditing?: boolean;
  details?: IPaymentBillingDetail[];
  headerDetail?: IPaymentBilling;
  onChangeRow?: (index: number, data: IPaymentBillingDetail) => void;
  onDeleteRow?: (index: number) => void;
  onFocusOutOfAmount?: () => void;
  columnDisplay?: ColumnDisplayConfig;
  rowConditionConfig?: RowConditionConfig;
  mapPolicyNoPlanCode?: Map<string, string>;
  percentCopayMap?: PercentCopayMap;
  benefitOptions?: Array<{ label: string; value: string }>;
}

export function SettlementTable({
  isEditing = false,
  details = [],
  headerDetail,
  onChangeRow,
  onDeleteRow,
  onFocusOutOfAmount,
  columnDisplay,
  rowConditionConfig,
  mapPolicyNoPlanCode,
  percentCopayMap,
  benefitOptions = [],
}: SettlementTableProps) {
  const { displayRemaining, isCopay, isDeduct } = columnDisplay ?? {};

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const handleToggleExpand = useCallback((index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <div className="mt-4 flex rounded-lg border border-gray-300 shadow-sm overflow-hidden">

      {/* ================================================================
          LEFT TABLE — fixed width, no horizontal scroll
          Columns: Billing Items (SIMB) | Charge for calculate | Rider
          No sticky needed because the left table itself doesn't scroll.
          ================================================================ */}
      <div className="flex-none" style={{ boxShadow: '3px 0 8px rgba(0,0,0,0.08)' }}>
        <table className="settlement-table border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th
                className="border-b border-gray-300 px-3 py-3 text-left"
                style={{ minWidth: '200px' }}
              >
                Billing Items (SIMB)
              </th>
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '160px' }}
              >
                Charge for calculate
              </th>
              <th
                className="border-b border-gray-300 px-3 py-3 text-left"
                style={{ minWidth: '110px' }}
              >
                Rider
              </th>
              {/* Placeholder column for delete button when editing */}
              {isEditing && (
                <th className="border-b border-gray-300 px-3 py-3" style={{ width: '40px' }} />
              )}
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <SettlementRowLeft
                key={detail.id ?? index}
                isEditing={isEditing}
                itemIndex={index}
                itemDetail={detail}
                headerDetail={headerDetail}
                expandedRows={expandedRows.has(index)}
                onToggleExpand={() => handleToggleExpand(index)}
                onDeleteRow={onDeleteRow ? () => onDeleteRow(index) : undefined}
                columnDisplay={columnDisplay}
                onChangeDataRow={(data) => onChangeRow?.(index, data)}
                onFocusOutOfAmount={onFocusOutOfAmount}
                rowConditionConfig={rowConditionConfig}
              />
            ))}
            <SettlementSummaryLeft
              details={details}
              showDeletePlaceholder={isEditing && !!onDeleteRow}
            />
          </tbody>
        </table>
      </div>

      {/* ================================================================
          RIGHT TABLE — scrollable, contains Benefit dropdown
          The Benefit column has NO sticky context here, so the dropdown
          will render above all other content correctly.
          ================================================================ */}
      <div className="overflow-x-auto flex-1">
        <table className="settlement-table w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {/* 1. Benefit — dropdown lives here, no sticky */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-left"
                style={{ minWidth: '130px' }}
              >
                Benefit
              </th>

              {/* 2. Max Benefit */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '190px' }}
              >
                Max Benefit
              </th>

              {/* 3. Remaining (conditional) */}
              <Conditional condition={displayRemaining}>
                <th
                  className="border-b border-gray-300 px-3 py-3 text-right"
                  style={{ minWidth: '190px' }}
                >
                  Remaining
                </th>
              </Conditional>

              {/* 4. Non cover Item */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '170px' }}
              >
                Non cover Item
              </th>

              {/* 5. Non-cover */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '170px' }}
              >
                Non-cover
              </th>

              {/* 6. Eligible */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '140px' }}
              >
                Eligible
              </th>

              {/* 7. Percent copay (conditional) */}
              <Conditional condition={isCopay}>
                <th
                  className="border-b border-gray-300 px-3 py-3 text-right"
                  style={{ minWidth: '140px' }}
                >
                  Percent copay
                </th>
              </Conditional>

              {/* 8. Co-pay (conditional) */}
              <Conditional condition={isCopay}>
                <th
                  className="border-b border-gray-300 px-3 py-3 text-right"
                  style={{ minWidth: '130px' }}
                >
                  Co-pay
                </th>
              </Conditional>

              {/* 9. Deduct (conditional) */}
              <Conditional condition={isDeduct}>
                <th
                  className="border-b border-gray-300 px-3 py-3 text-right"
                  style={{ minWidth: '130px' }}
                >
                  Deduct
                </th>
              </Conditional>

              {/* 10. Paid */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '130px' }}
              >
                Paid
              </th>

              {/* 11. Exceed */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '130px' }}
              >
                Exceed
              </th>

              {/* 12. Adjust exgratia */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '150px' }}
              >
                Adjust exgratia
              </th>

              {/* 13. Exgratia */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '150px' }}
              >
                Exgratia
              </th>

              {/* 14. Subrogation */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '150px' }}
              >
                Subrogation
              </th>

              {/* 15. Receive Subro */}
              <th
                className="border-b border-gray-300 px-3 py-3 text-right"
                style={{ minWidth: '150px' }}
              >
                Receive Subro
              </th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <SettlementRowRight
                key={detail.id ?? index}
                isEditing={isEditing}
                itemIndex={index}
                itemDetail={detail}
                headerDetail={headerDetail}
                expandedRows={expandedRows.has(index)}
                columnDisplay={columnDisplay}
                onChangeDataRow={(data) => onChangeRow?.(index, data)}
                onFocusOutOfAmount={onFocusOutOfAmount}
                rowConditionConfig={rowConditionConfig}
                mapPolicyNoPlanCode={mapPolicyNoPlanCode}
                percentCopayMap={percentCopayMap}
                benefitOptions={benefitOptions}
              />
            ))}
            <SettlementSummaryRight details={details} columnDisplay={columnDisplay} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
