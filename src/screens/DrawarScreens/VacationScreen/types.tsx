export type MarkedDates = {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
    marked?: boolean;
    dotColor?: string;
  };
};

export type VacationType = 'annual' | 'sick' | 'unpaid' | 'emergency';

export interface VacationTypeOption {
  key: VacationType;
  label: string;
  icon: string;
  color: string;
  bg: string;
}
