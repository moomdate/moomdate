import { formatCurrency } from '@/utils/formatUtil.ts';
import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';
import { IPaymentBilling } from '@pages/claim/details/types/IPaymentBilling.ts';
import { ReactNode } from 'react';
import InputNumber from '@/components/common/input/InputNumber.tsx';
import { ColumnDisplayConfig, RowConditionConfig } from '../config/columnDisplayConfig.ts';
import { NonCoverItemRowLeft } from './NonCoverItemRowLeft.tsx';

interface SettlementRowLeftProps {
  isEditing: boolean;
  itemIndex?: number;
  onChangeDataRow?: (data: IPaymentBillingDetail) => void;
  itemDetail?: IPaymentBillingDetail;
  headerDetail?: IPaymentBilling;
  expandedRows: boolean;
  onToggleExpand?: () => void;
  onDeleteRow?: () => void;
  columnDisplay?: ColumnDisplayConfig;
  onFocusOutOfAmount?: () => void;
  rowConditionConfig?: RowConditionConfig;
}

export function SettlementRowLeft({
  isEditing,
  itemDetail,
  expandedRows,
  onToggleExpand,
  onDeleteRow,
  onChangeDataRow,
  onFocusOutOfAmount,
}: SettlementRowLeftProps): ReactNode {
  const nonCoverItems = itemDetail?.nonCoverItems ?? [];

  function handleFieldChange(field: keyof IPaymentBillingDetail, value: string | number) {
    if (!itemDetail) return;
    onChangeDataRow?.({ ...itemDetail, [field]: value });
  }

  return (
    <>
      <tr style={{ height: '50px' }} className="text-sm">
        {/* Billing Items (SIMB) */}
        <td className="border-b border-gray-200 bg-white px-3 py-2" style={{ minWidth: '200px' }}>
          <div className="flex items-center gap-2">
            {nonCoverItems.length > 0 && (
              <button
                type="button"
                onClick={onToggleExpand}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                {expandedRows ? '▼' : '▶'}
              </button>
            )}
            <span className="truncate">{itemDetail?.billingItem ?? '-'}</span>
          </div>
        </td>

        {/* Charge for Calculate */}
        <td
          className="border-b border-gray-200 bg-white px-3 py-2 text-right"
          style={{ minWidth: '160px' }}
        >
          {isEditing ? (
            <InputNumber
              value={itemDetail?.chargeForCalculate}
              onChange={(v) => handleFieldChange('chargeForCalculate', v)}
              onBlur={onFocusOutOfAmount}
              className="w-full"
            />
          ) : (
            <span>{formatCurrency(itemDetail?.chargeForCalculate)}</span>
          )}
        </td>

        {/* Rider */}
        <td className="border-b border-gray-200 bg-white px-3 py-2" style={{ minWidth: '110px' }}>
          {itemDetail?.rider ?? '-'}
        </td>

        {/* Delete button (only on left table to avoid duplication) */}
        {isEditing && onDeleteRow && (
          <td className="border-b border-gray-200 bg-white px-3 py-2">
            <button
              type="button"
              onClick={onDeleteRow}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </td>
        )}
      </tr>

      {/* Expanded NonCoverItem left rows */}
      {expandedRows &&
        nonCoverItems.map((item, idx) => (
          <NonCoverItemRowLeft
            key={item.id ?? idx}
            item={item}
            showDeleteColumn={isEditing && !!onDeleteRow}
          />
        ))}
    </>
  );
}
