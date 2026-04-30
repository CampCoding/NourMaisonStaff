import { TransferRecord } from './types';

export const TRANSFERS: TransferRecord[] = [
  {
    id: '1',
    type: 'salary',
    amount: 4200,
    date: 'Apr 25, 2026',
    time: '09:00 AM',
    method: 'Bank Transfer',
    note: 'April Monthly Salary',
    status: 'completed',
    month: 'April 2026',
  },
  {
    id: '2',
    type: 'advance',
    amount: 800,
    date: 'Apr 18, 2026',
    time: '02:30 PM',
    method: 'Cash',
    note: 'Personal request',
    status: 'completed',
    month: 'April 2026',
  },
  {
    id: '3',
    type: 'advance',
    amount: 500,
    date: 'Apr 10, 2026',
    time: '11:15 AM',
    method: 'Bank Transfer',
    status: 'pending',
    month: 'April 2026',
  },
  {
    id: '4',
    type: 'salary',
    amount: 4200,
    date: 'Mar 25, 2026',
    time: '09:00 AM',
    method: 'Bank Transfer',
    note: 'March Monthly Salary',
    status: 'completed',
    month: 'March 2026',
  },
  {
    id: '5',
    type: 'advance',
    amount: 1000,
    date: 'Mar 12, 2026',
    time: '03:45 PM',
    method: 'Cash',
    note: 'Emergency advance',
    status: 'completed',
    month: 'March 2026',
  },
  {
    id: '6',
    type: 'advance',
    amount: 300,
    date: 'Mar 5, 2026',
    time: '10:00 AM',
    method: 'Bank Transfer',
    status: 'failed',
    month: 'March 2026',
  },
  {
    id: '7',
    type: 'salary',
    amount: 4000,
    date: 'Feb 25, 2026',
    time: '09:00 AM',
    method: 'Bank Transfer',
    note: 'February Monthly Salary',
    status: 'completed',
    month: 'February 2026',
  },
  {
    id: '8',
    type: 'advance',
    amount: 600,
    date: 'Feb 8, 2026',
    time: '01:00 PM',
    method: 'Cash',
    status: 'completed',
    month: 'February 2026',
  },
];

export const formatCurrency = (amount: number) =>
  `EGP ${amount.toLocaleString('en-EG')}`;

export const statusConfig = {
  completed: {
    label: 'Completed',
    color: '#84b067',
    bg: 'rgba(132,176,103,0.12)',
  },
  pending: {
    label: 'Pending',
    color: '#dd9933',
    bg: 'rgba(221,153,51,0.12)',
  },
  failed: { label: 'Failed', color: '#e05252', bg: 'rgba(224,82,82,0.10)' },
};

export const typeConfig = {
  salary: {
    label: 'Salary',
    icon: '💰',
    color: '#84b067',
    bg: 'rgba(132,176,103,0.13)',
  },
  advance: {
    label: 'Advance',
    icon: '⚡',
    color: '#b57c1c',
    bg: 'rgba(221,153,51,0.13)',
  },
};
