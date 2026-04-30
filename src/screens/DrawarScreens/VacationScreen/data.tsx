import { Colors } from '../../../constants';
import { VacationTypeOption } from './types';

export const VACATION_TYPES: VacationTypeOption[] = [
  {
    key: 'annual',
    label: 'Annual Leave',
    icon: 'Annual',
    color: Colors.primary,
    bg: '#fff8ec',
  },
  {
    key: 'sick',
    label: 'Sick Leave',
    icon: 'Sick',
    color: '#e06b6b',
    bg: '#fff0f0',
  },
  {
    key: 'unpaid',
    label: 'Unpaid Leave',
    icon: 'Note',
    color: Colors.textMuted,
    bg: Colors.gray,
  },
  {
    key: 'emergency',
    label: 'Emergency',
    icon: 'Hospital',
    color: '#e09b3d',
    bg: '#fff5e0',
  },
];
