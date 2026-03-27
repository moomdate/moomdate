import { INonCoverItem } from '@pages/claim/details/types/INonCoverItem.ts';
import { formatCurrency } from '@/utils/formatUtil.ts';
import { ColumnDisplayConfig } from '../config/columnDisplayConfig.ts';

interface NonCoverItemRowProps {
  item: INonCoverItem;
  columnDisplay?: ColumnDisplayConfig;
}

export function NonCoverItemRow({ item, columnDisplay }: NonCoverItemRowProps) {
  const { isCopay, isDeduct, displayRemaining } = columnDisplay ?? {};

  return (
    <tr style={{ height: '44px' }} className="bg-gray-50 text-sm">
      {/* Left columns — single colSpan covering all left columns in the deprecated single-table layout */}
      <td className="border-b border-gray-200 px-3 py-2 pl-8 text-gray-600" colSpan={3}>
        {item.itemName ?? '-'}
      </td>

      {/* Right columns */}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600" colSpan={2}>
        {formatCurrency(item.amount)}
      </td>
      {displayRemaining && (
        <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      )}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">
        {formatCurrency(item.amount)}
      </td>
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      {isCopay && (
        <>
          <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
          <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
        </>
      )}
      {isDeduct && (
        <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      )}
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
      <td className="border-b border-gray-200 px-3 py-2 text-right text-gray-600">-</td>
    </tr>
  );
}
