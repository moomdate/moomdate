import { ReactNode } from 'react';

interface ConditionalProps {
  condition?: boolean;
  children: ReactNode;
}

export default function Conditional({ condition, children }: ConditionalProps) {
  if (!condition) return null;
  return <>{children}</>;
}
