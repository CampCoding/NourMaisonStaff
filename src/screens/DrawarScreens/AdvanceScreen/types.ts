export type RepaymentPlan = '1' | '2' | '3' | '6';
export type AdvanceReason =
  | 'medical'
  | 'education'
  | 'housing'
  | 'personal'
  | 'emergency'
  | 'other';

export interface ReasonOption {
  key: AdvanceReason;
  label: string;
  icon: string;
}

export interface RepaymentOption {
  key: RepaymentPlan;
  label: string;
  sublabel: string;
}
