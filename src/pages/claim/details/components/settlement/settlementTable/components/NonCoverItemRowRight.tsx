import { INonCoverItem } from '@pages/claim/details/types/INonCoverItem.ts';
import { formatCurrency } from '@/utils/formatUtil.ts';
import { ColumnDisplayConfig } from '../config/columnDisplayConfig.ts';

interface NonCoverItemRowRightProps {
  item: INonCoverItem;
  columnDisplay?: ColumnDisplayConfig;
}

export function NonCoverItemRowRight({ item, columnDisplay }: NonCoverItemRowRightProps) {
  const { isCopay, isDeduct, displayRemaining } = columnDisplay ?? {};

  return (
    <tr style={{ height: '44px' }} className="bg-gray-50 text-sm">
      {/* Benefit */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Max Benefit */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Remaining (conditional) */}
      {displayRemaining && (
        <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      )}
      {/* Non cover Item */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">
        {formatCurrency(item.amount)}
      </td>
      {/* Non-cover */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Eligible */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Percent copay (conditional) */}
      {isCopay && (
        <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      )}
      {/* Co-pay (conditional) */}
      {isCopay && (
        <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      )}
      {/* Deduct (conditional) */}
      {isDeduct && (
        <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      )}
      {/* Paid */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Exceed */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Adjust exgratia */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Exgratia */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Subrogation */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {/* Receive Subro */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
    </tr>
  );
}
