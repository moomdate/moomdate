import { ChangeEvent } from 'react';

interface InputNumberProps {
  value?: number;
  onChange?: (value: number) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export default function InputNumber({
  value,
  onChange,
  onBlur,
  disabled,
  className = '',
  placeholder,
  min,
  max,
}: InputNumberProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/,/g, '');
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange?.(num);
    }
  }

  return (
    <input
      type="number"
      value={value ?? ''}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`rounded border border-gray-300 px-2 py-1 text-right text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  );
}
