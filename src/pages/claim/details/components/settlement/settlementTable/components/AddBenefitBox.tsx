import Dropdown from '@/components/common/Dropdown.tsx';

interface BenefitOption {
  label: string;
  value: string;
}

interface AddBenefitBoxProps {
  value?: string;
  options?: BenefitOption[];
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function AddBenefitBox({ value, options = [], onChange, disabled }: AddBenefitBoxProps) {
  return (
    <div className="min-w-[120px]">
      <Dropdown
        value={value}
        options={options}
        onChange={onChange}
        disabled={disabled}
        placeholder="เลือก Benefit"
        className="w-full"
      />
    </div>
  );
}
