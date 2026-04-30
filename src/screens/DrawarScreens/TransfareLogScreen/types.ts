export type TransferType = 'salary' | 'advance';
export type FilterTab = 'all' | 'salary' | 'advance';

export interface TransferRecord {
  id: string;
  type: TransferType;
  amount: number;
  date: string;
  time: string;
  method: string;
  note?: string;
  status: 'completed' | 'pending' | 'failed';
  month?: string;
}
