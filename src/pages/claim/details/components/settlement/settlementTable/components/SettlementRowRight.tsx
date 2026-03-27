import { formatCurrency } from '@/utils/formatUtil.ts';
import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';
import { IPaymentBilling } from '@pages/claim/details/types/IPaymentBilling.ts';
import { ReactNode } from 'react';
import InputNumber from '@/components/common/input/InputNumber.tsx';
import { PercentCopayMap } from '@pages/claim/details/components/settlement/hook/usePolicyCopayMap.ts';
import { ColumnDisplayConfig, RowConditionConfig } from '../config/columnDisplayConfig.ts';
import Conditional from '@pages/claim/details/components/settlement/component/Conditional.tsx';
import { AddBenefitBox } from './AddBenefitBox.tsx';
import { NonCoverItemRowRight } from './NonCoverItemRowRight.tsx';

interface SettlementRowRightProps {
  isEditing: boolean;
  itemIndex?: number;
  onChangeDataRow?: (data: IPaymentBillingDetail) => void;
  itemDetail?: IPaymentBillingDetail;
  headerDetail?: IPaymentBilling;
  expandedRows: boolean;
  columnDisplay?: ColumnDisplayConfig;
  onFocusOutOfAmount?: () => void;
  rowConditionConfig?: RowConditionConfig;
  mapPolicyNoPlanCode?: Map<string, string>;
  percentCopayMap?: PercentCopayMap;
  benefitOptions?: Array<{ label: string; value: string }>;
}

export function SettlementRowRight({
  isEditing,
  itemDetail,
  headerDetail: _headerDetail,
  expandedRows,
  columnDisplay,
  onChangeDataRow,
  onFocusOutOfAmount,
  rowConditionConfig: _rowConditionConfig,
  mapPolicyNoPlanCode: _mapPolicyNoPlanCode,
  percentCopayMap: _percentCopayMap,
  benefitOptions = [],
}: SettlementRowRightProps): ReactNode {
  const { displayRemaining, isCopay, isDeduct } = columnDisplay ?? {};
  const nonCoverItems = itemDetail?.nonCoverItems ?? [];

  function handleFieldChange(field: keyof IPaymentBillingDetail, value: string | number) {
    if (!itemDetail) return;
    onChangeDataRow?.({ ...itemDetail, [field]: value });
  }

  return (
    <>
      <tr style={{ height: '50px' }} className="text-sm">
        {/* Benefit — no sticky here, dropdown will render correctly */}
        <td className="border-b border-gray-200 px-3 py-2" style={{ minWidth: '130px' }}>
          <AddBenefitBox
            value={itemDetail?.benefit}
            options={benefitOptions}
            onChange={(v) => handleFieldChange('benefit', v)}
            disabled={!isEditing}
          />
        </td>

        {/* Max Benefit */}
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '190px' }}
        >
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
          <td
            className="border-b border-gray-200 px-3 py-2 text-right"
            style={{ minWidth: '190px' }}
          >
            {formatCurrency(itemDetail?.remaining)}
          </td>
        </Conditional>

        {/* Non cover Item */}
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '170px' }}
        >
          {formatCurrency(itemDetail?.nonCoverItem)}
        </td>

        {/* Non-cover */}
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '170px' }}
        >
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
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '140px' }}
        >
          {formatCurrency(itemDetail?.eligible)}
        </td>

        {/* Percent Copay (conditional) */}
        <Conditional condition={isCopay}>
          <td
            className="border-b border-gray-200 px-3 py-2 text-right"
            style={{ minWidth: '140px' }}
          >
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
          <td
            className="border-b border-gray-200 px-3 py-2 text-right"
            style={{ minWidth: '130px' }}
          >
            {formatCurrency(itemDetail?.copay)}
          </td>
        </Conditional>

        {/* Deduct (conditional) */}
        <Conditional condition={isDeduct}>
          <td
            className="border-b border-gray-200 px-3 py-2 text-right"
            style={{ minWidth: '130px' }}
          >
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
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '130px' }}
        >
          {formatCurrency(itemDetail?.paid)}
        </td>

        {/* Exceed */}
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '130px' }}
        >
          {formatCurrency(itemDetail?.exceed)}
        </td>

        {/* Adjust exgratia */}
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '150px' }}
        >
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
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '150px' }}
        >
          {formatCurrency(itemDetail?.exgratia)}
        </td>

        {/* Subrogation */}
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '150px' }}
        >
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
        <td
          className="border-b border-gray-200 px-3 py-2 text-right"
          style={{ minWidth: '150px' }}
        >
          {formatCurrency(itemDetail?.receiveSubro)}
        </td>
      </tr>

      {/* Expanded NonCoverItem right rows */}
      {expandedRows &&
        nonCoverItems.map((item, idx) => (
          <NonCoverItemRowRight
            key={item.id ?? idx}
            item={item}
            columnDisplay={columnDisplay}
          />
        ))}
    </>
  );
}
