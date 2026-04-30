import { ReasonOption, RepaymentOption } from './types';

export const MONTHLY_SALARY = 8500;
export const MAX_ADVANCE_PERCENT = 0.5;
export const MAX_ADVANCE = MONTHLY_SALARY * MAX_ADVANCE_PERCENT;

export const REASON_OPTIONS: ReasonOption[] = [
  { key: 'medical', label: 'Medical', icon: 'Hospital' },
  { key: 'education', label: 'Education', icon: 'Education' },
  { key: 'housing', label: 'Housing', icon: 'House' },
  { key: 'personal', label: 'Personal', icon: 'Personal' },
  { key: 'emergency', label: 'Emergency', icon: 'Sick' },
  { key: 'other', label: 'Other', icon: 'Other' },
];

export const REPAYMENT_OPTIONS: RepaymentOption[] = [
  { key: '1', label: '1 Month', sublabel: 'Full deduction' },
  { key: '2', label: '2 Months', sublabel: 'Split in 2' },
  { key: '3', label: '3 Months', sublabel: 'Split in 3' },
  { key: '6', label: '6 Months', sublabel: 'Split in 6' },
];

export const QUICK_AMOUNTS = [500, 1000, 2000, 3000];
