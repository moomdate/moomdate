import { NonCoverItemRow } from '@pages/claim/details/components/settlement/settlementTable/components/NonCoverItemRow.tsx';
import { formatCurrency } from '@/utils/formatUtil.ts';
import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';
import { IPaymentBilling } from '@pages/claim/details/types/IPaymentBilling.ts';
import { ReactNode } from 'react';
import InputNumber from '@/components/common/input/InputNumber.tsx';
import { PercentCopayMap } from '@pages/claim/details/components/settlement/hook/usePolicyCopayMap.ts';
import Conditional from '@pages/claim/details/components/settlement/component/Conditional.tsx';
import {
  ColumnDisplayConfig,
  RowConditionConfig,
} from '@pages/claim/details/components/settlement/settlementTable/config/columnDisplayConfig.ts';
import { AddBenefitBox } from './AddBenefitBox.tsx';

interface SettlementRowDataProperties {
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
  mapPolicyNoPlanCode?: Map<string, string>;
  percentCopayMap?: PercentCopayMap;
  benefitOptions?: Array<{ label: string; value: string }>;
}

/**
 * @deprecated Use SettlementRowLeft + SettlementRowRight instead.
 * This is the original single-table row component kept for reference.
 */
export function SettlementRowData({
  isEditing,
  itemDetail,
  headerDetail: _headerDetail,
  expandedRows,
  onToggleExpand,
  onDeleteRow,
  columnDisplay,
  onChangeDataRow,
  onFocusOutOfAmount,
  rowConditionConfig: _rowConditionConfig,
  mapPolicyNoPlanCode: _mapPolicyNoPlanCode,
  percentCopayMap: _percentCopayMap,
  benefitOptions = [],
}: SettlementRowDataProperties): ReactNode {
  const { displayRemaining, isCopay, isDeduct } = columnDisplay ?? {};
  const nonCoverItems = itemDetail?.nonCoverItems ?? [];

  function handleFieldChange(field: keyof IPaymentBillingDetail, value: string | number) {
    if (!itemDetail) return;
    onChangeDataRow?.({ ...itemDetail, [field]: value });
  }

  return (
    <>
      <tr style={{ height: '50px' }} className="text-sm">
        {/* === LEFT COLUMNS (sticky in single-table) === */}
        {/* Billing Items (SIMB) */}
        <td
          className="sticky left-0 z-10 border-b border-gray-200 bg-white px-3 py-2"
          style={{ minWidth: '200px' }}
        >
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
          className="sticky left-[200px] z-10 border-b border-gray-200 bg-white px-3 py-2 text-right"
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
        <td
          className="sticky left-[360px] z-10 border-b border-gray-200 bg-white px-3 py-2"
          style={{ minWidth: '110px' }}
        >
          {itemDetail?.rider ?? '-'}
        </td>

        {/* === RIGHT COLUMNS === */}
        {/* Benefit — NOTE: in split-table solution, this moves to the right table where there is no sticky context */}
        <td
          className="border-b border-gray-200 px-3 py-2"
          style={{ minWidth: '130px' }}
        >
          <AddBenefitBox
            value={itemDetail?.benefit}
            options={benefitOptions}
            onChange={(v) => handleFieldChange('benefit', v)}
            disabled={!isEditing}
          />
        </td>

        {/* Max Benefit */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '190px' }}>
          {isEditing ? (
            <InputNumber
              value={itemDetail?.maxBenefit}
              onChange={(v) => handleFieldChange('maxBenefit', v)}
              className="w-full"
            />
          ) : (
            <span>{formatCurrency(itemDetail?.maxBenefit)}</span>
          )}
        </td>

        {/* Remaining (conditional) */}
        <Conditional condition={displayRemaining}>
          <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '190px' }}>
            {formatCurrency(itemDetail?.remaining)}
          </td>
        </Conditional>

        {/* Non cover Item */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '170px' }}>
          {formatCurrency(itemDetail?.nonCoverItem)}
        </td>

        {/* Non-cover */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '170px' }}>
          {isEditing ? (
            <InputNumber
              value={itemDetail?.nonCover}
              onChange={(v) => handleFieldChange('nonCover', v)}
              onBlur={onFocusOutOfAmount}
              className="w-full"
            />
          ) : (
            <span>{formatCurrency(itemDetail?.nonCover)}</span>
          )}
        </td>

        {/* Eligible */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '140px' }}>
          {formatCurrency(itemDetail?.eligible)}
        </td>

        {/* Percent Copay (conditional) */}
        <Conditional condition={isCopay}>
          <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '140px' }}>
            {isEditing ? (
              <InputNumber
                value={itemDetail?.percentCopay}
                onChange={(v) => handleFieldChange('percentCopay', v)}
                className="w-full"
              />
            ) : (
              <span>{formatCurrency(itemDetail?.percentCopay)}</span>
            )}
          </td>
        </Conditional>

        {/* Co-pay (conditional) */}
        <Conditional condition={isCopay}>
          <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
            {formatCurrency(itemDetail?.copay)}
          </td>
        </Conditional>

        {/* Deduct (conditional) */}
        <Conditional condition={isDeduct}>
          <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
            {isEditing ? (
              <InputNumber
                value={itemDetail?.deduct}
                onChange={(v) => handleFieldChange('deduct', v)}
                onBlur={onFocusOutOfAmount}
                className="w-full"
              />
            ) : (
              <span>{formatCurrency(itemDetail?.deduct)}</span>
            )}
          </td>
        </Conditional>

        {/* Paid */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
          {formatCurrency(itemDetail?.paid)}
        </td>

        {/* Exceed */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '130px' }}>
          {formatCurrency(itemDetail?.exceed)}
        </td>

        {/* Adjust exgratia */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
          {isEditing ? (
            <InputNumber
              value={itemDetail?.adjustExgratia}
              onChange={(v) => handleFieldChange('adjustExgratia', v)}
              className="w-full"
            />
          ) : (
            <span>{formatCurrency(itemDetail?.adjustExgratia)}</span>
          )}
        </td>

        {/* Exgratia */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
          {formatCurrency(itemDetail?.exgratia)}
        </td>

        {/* Subrogation */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
          {isEditing ? (
            <InputNumber
              value={itemDetail?.subrogation}
              onChange={(v) => handleFieldChange('subrogation', v)}
              className="w-full"
            />
          ) : (
            <span>{formatCurrency(itemDetail?.subrogation)}</span>
          )}
        </td>

        {/* Receive Subro */}
        <td className="border-b border-gray-200 px-3 py-2 text-right" style={{ minWidth: '150px' }}>
          {formatCurrency(itemDetail?.receiveSubro)}
        </td>

        {/* Delete button */}
        {isEditing && onDeleteRow && (
          <td className="border-b border-gray-200 px-3 py-2">
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

      {/* Expanded NonCoverItem rows */}
      {expandedRows &&
        nonCoverItems.map((item, idx) => (
          <NonCoverItemRow key={item.id ?? idx} item={item} columnDisplay={columnDisplay} />
        ))}
    </>
  );
}
