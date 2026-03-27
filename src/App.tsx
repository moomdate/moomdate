import { useState } from 'react';
import { SettlementTable } from '@pages/claim/details/components/settlement/settlementTable/SettlementTable.tsx';
import { IPaymentBillingDetail } from '@pages/claim/details/types/IPaymentBillingDetail.ts';

const BENEFIT_OPTIONS = [
  { label: 'IPD', value: 'IPD' },
  { label: 'OPD', value: 'OPD' },
  { label: 'Dental', value: 'DENTAL' },
  { label: 'Vision', value: 'VISION' },
];

const INITIAL_DETAILS: IPaymentBillingDetail[] = [
  {
    id: '1',
    billingItem: 'Hospital Room & Board',
    chargeForCalculate: 15000,
    rider: 'H101',
    benefit: 'IPD',
    maxBenefit: 10000,
    remaining: 5000,
    nonCoverItem: 500,
    nonCover: 500,
    eligible: 14500,
    percentCopay: 10,
    copay: 1450,
    deduct: 0,
    paid: 8550,
    exceed: 0,
    adjustExgratia: 0,
    exgratia: 0,
    subrogation: 0,
    receiveSubro: 0,
    nonCoverItems: [
      { id: 'n1', itemCode: 'NC001', itemName: 'Personal Items', amount: 300 },
      { id: 'n2', itemCode: 'NC002', itemName: 'Telephone Charges', amount: 200 },
    ],
  },
  {
    id: '2',
    billingItem: 'Physician Visit Fee',
    chargeForCalculate: 3000,
    rider: 'H102',
    benefit: 'OPD',
    maxBenefit: 2000,
    remaining: 1000,
    nonCoverItem: 0,
    nonCover: 0,
    eligible: 3000,
    percentCopay: 10,
    copay: 300,
    deduct: 0,
    paid: 1700,
    exceed: 0,
    adjustExgratia: 0,
    exgratia: 0,
    subrogation: 0,
    receiveSubro: 0,
    nonCoverItems: [],
  },
  {
    id: '3',
    billingItem: 'Surgery Fee',
    chargeForCalculate: 50000,
    rider: 'H103',
    benefit: 'IPD',
    maxBenefit: 40000,
    remaining: 10000,
    nonCoverItem: 2000,
    nonCover: 2000,
    eligible: 48000,
    percentCopay: 20,
    copay: 9600,
    deduct: 1000,
    paid: 27400,
    exceed: 10000,
    adjustExgratia: 500,
    exgratia: 500,
    subrogation: 0,
    receiveSubro: 0,
    nonCoverItems: [
      { id: 'n3', itemCode: 'NC003', itemName: 'Cosmetic Procedure', amount: 2000 },
    ],
  },
];

export default function App() {
  const [details, setDetails] = useState<IPaymentBillingDetail[]>(INITIAL_DETAILS);
  const [isEditing, setIsEditing] = useState(false);
  const [showCopay, setShowCopay] = useState(true);
  const [showDeduct, setShowDeduct] = useState(true);
  const [showRemaining, setShowRemaining] = useState(true);

  function handleChangeRow(index: number, data: IPaymentBillingDetail) {
    setDetails((prev) => prev.map((d, i) => (i === index ? data : d)));
  }

  function handleDeleteRow(index: number) {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Settlement Table — Split Left/Right Fix
        </h1>
        <p className="mb-4 text-sm text-gray-600">
          The Benefit dropdown column lives in the <strong>right (scrollable) table</strong> where
          there are no sticky elements creating stacking contexts. The dropdown will render
          correctly above all other content.
        </p>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isEditing}
              onChange={(e) => setIsEditing(e.target.checked)}
              className="h-4 w-4"
            />
            Edit Mode
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showCopay}
              onChange={(e) => setShowCopay(e.target.checked)}
              className="h-4 w-4"
            />
            Show Copay columns
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showDeduct}
              onChange={(e) => setShowDeduct(e.target.checked)}
              className="h-4 w-4"
            />
            Show Deduct column
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showRemaining}
              onChange={(e) => setShowRemaining(e.target.checked)}
              className="h-4 w-4"
            />
            Show Remaining column
          </label>
        </div>

        {/* Settlement Table */}
        <SettlementTable
          isEditing={isEditing}
          details={details}
          onChangeRow={handleChangeRow}
          onDeleteRow={isEditing ? handleDeleteRow : undefined}
          columnDisplay={{
            isCopay: showCopay,
            isDeduct: showDeduct,
            displayRemaining: showRemaining,
          }}
          benefitOptions={BENEFIT_OPTIONS}
        />
      </div>
    </div>
  );
}
