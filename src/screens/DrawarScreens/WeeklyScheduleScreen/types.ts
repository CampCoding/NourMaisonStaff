export interface ShiftData {
  date: string;
  start: string;
  end: string;
  breakStart: string;
  breakEnd: string;
}

export type DayState = 'past' | 'today' | 'future';
