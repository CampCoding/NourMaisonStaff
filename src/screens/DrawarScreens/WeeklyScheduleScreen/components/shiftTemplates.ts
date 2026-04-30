import { ShiftData } from '../types';
import { getWorkdaysOf } from '../utiles';

export const SHIFT_TEMPLATES = [
  { start: '09:00', end: '17:00', breakStart: '13:00', breakEnd: '13:30' },
  { start: '11:00', end: '20:00', breakStart: '14:30', breakEnd: '15:00' },
  { start: '08:00', end: '16:00', breakStart: '12:00', breakEnd: '12:45' },
  { start: '14:00', end: '22:00', breakStart: '17:30', breakEnd: '18:00' },
  { start: '10:00', end: '18:00', breakStart: '13:00', breakEnd: '13:30' },
];

export function generateWeekData(monday: Date): ShiftData[] {
  const workdays = getWorkdaysOf(monday);
  return workdays.map((date, i) => ({
    date,
    ...SHIFT_TEMPLATES[i % SHIFT_TEMPLATES.length],
  }));
}
