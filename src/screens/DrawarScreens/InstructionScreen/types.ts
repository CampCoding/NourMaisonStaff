export type RoleKey = 'all' | 'waiter' | 'kitchen' | 'cashier' | 'manager';
export type CategoryKey =
  | 'opening'
  | 'service'
  | 'hygiene'
  | 'closing'
  | 'emergency'
  | 'training';
export type Priority = 'critical' | 'high' | 'normal';

export interface StepItem {
  id: string;
  text: string;
  note?: string;
}

export interface SOPItem {
  id: string;
  title: string;
  category: CategoryKey;
  roles: RoleKey[];
  priority: Priority;
  steps: StepItem[];
  tips?: string;
}
