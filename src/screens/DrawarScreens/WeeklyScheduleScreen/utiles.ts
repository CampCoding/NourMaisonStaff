import { DayState, ShiftData } from './types';

export function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function todayStr(): string {
  return toDateStr(new Date(2026, 3, 28));
}

export function getMondayOf(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getWorkdaysOf(monday: Date): string[] {
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return toDateStr(d);
  });
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    weekdayLong: d.toLocaleDateString('en-US', { weekday: 'long' }),
    day: d.getDate().toString(),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
  };
}

export function getDayState(dateStr: string): DayState {
  const today = todayStr();
  if (dateStr < today) return 'past';
  if (dateStr === today) return 'today';
  return 'future';
}

export function weekRangeLabel(monday: Date): string {
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(monday)} – ${fmt(friday)}`;
}

//**************************************************************************************************************** */

export function calcDuration(start: string, end: string): string {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function calcWorkDuration(shift: ShiftData): string {
  const [sh, sm] = shift.start.split(':').map(Number);
  const [eh, em] = shift.end.split(':').map(Number);
  const [bsh, bsm] = shift.breakStart.split(':').map(Number);
  const [beh, bem] = shift.breakEnd.split(':').map(Number);
  const totalMins = eh * 60 + em - (sh * 60 + sm);
  const breakMins = beh * 60 + bem - (bsh * 60 + bsm);
  const workMins = totalMins - breakMins;
  const h = Math.floor(workMins / 60);
  const m = workMins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function calculateTotalWorkMinutes(shifts: ShiftData[]): number {
  return shifts.reduce((sum, s) => {
    const [sh, sm] = s.start.split(':').map(Number);
    const [eh, em] = s.end.split(':').map(Number);
    const [bsh, bsm] = s.breakStart.split(':').map(Number);
    const [beh, bem] = s.breakEnd.split(':').map(Number);
    return (
      sum +
      (eh * 60 + em - (sh * 60 + sm)) -
      (beh * 60 + bem - (bsh * 60 + bsm))
    );
  }, 0);
}
