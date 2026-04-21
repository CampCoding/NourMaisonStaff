import { Shift } from '../screens/DrawarScreens/HomeScreen/types';

export const timeToMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export const minutesToTime = (min: number) => {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

export const formatDuration = (start: string, end: string): string => {
  const diff = timeToMinutes(end) - timeToMinutes(start);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const formatHours = (start: string, end: string): string => {
  const diff = timeToMinutes(end) - timeToMinutes(start);
  return (diff / 60).toFixed(1);
};

export const getNetWork = (shift: Shift): string => {
  const total = timeToMinutes(shift.end) - timeToMinutes(shift.start);
  const breakTime =
    timeToMinutes(shift.breakEnd) - timeToMinutes(shift.breakStart);
  const net = total - breakTime;
  const h = Math.floor(net / 60);
  const m = net % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const getNetHours = (shift: Shift): number => {
  const total = timeToMinutes(shift.end) - timeToMinutes(shift.start);
  const breakTime =
    timeToMinutes(shift.breakEnd) - timeToMinutes(shift.breakStart);
  return (total - breakTime) / 60;
};

export const today = new Date().toISOString().split('T')[0];
