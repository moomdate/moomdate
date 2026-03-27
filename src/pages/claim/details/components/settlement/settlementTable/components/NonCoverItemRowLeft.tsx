import { INonCoverItem } from '@pages/claim/details/types/INonCoverItem.ts';

interface NonCoverItemRowLeftProps {
  item: INonCoverItem;
  /** Pass true when the left table includes a delete-button column so the colSpan stays correct. */
  showDeleteColumn?: boolean;
}

export function NonCoverItemRowLeft({ item, showDeleteColumn }: NonCoverItemRowLeftProps) {
  // 3 data columns + optional delete column
  const colSpan = showDeleteColumn ? 4 : 3;

  return (
    <tr style={{ height: '44px' }} className="bg-gray-50 text-sm">
      <td className="border-b border-gray-200 px-3 py-2 pl-8 text-gray-600" colSpan={colSpan}>
        {item.itemName ?? '-'}
      </td>
    </tr>
  );
}
