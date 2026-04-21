import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getNetHours, today } from '../../../utiles/homeUtiles';
import { MY_SCHEDULE } from './data';
import { Shift } from './types';
import { Colors } from '../../../constants';
import { Animated } from 'react-native';

export const useHomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarVisible, setCalendarVisible] = useState(true);
  const calendarAnim = useRef(new Animated.Value(1)).current;

  const scheduleMap = useMemo(() => {
    const map: Record<string, Shift> = {};
    MY_SCHEDULE.forEach(s => {
      map[s.date] = s;
    });
    return map;
  }, []);

  useEffect(() => {
    console.log('calendarVisible', calendarVisible);
  }, [calendarVisible]);
  const markedDates = useMemo(() => {
    const dates: Record<string, any> = {};

    // Mark all scheduled dates
    MY_SCHEDULE.forEach(s => {
      dates[s.date] = {
        marked: true,
        dotColor: Colors.primary,
      };
    });

    // Mark the selected date
    if (selectedDate) {
      dates[selectedDate] = {
        ...dates[selectedDate],
        selected: true,
        selectedColor: Colors.primary,
      };
    }

    return dates;
  }, [selectedDate]);

  const shift = useMemo(
    () => scheduleMap[selectedDate] || null,
    [scheduleMap, selectedDate],
  );

  // Get Weekly Hours
  const getWeeklyHours = useCallback((): number => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    let total = 0;
    MY_SCHEDULE.forEach(s => {
      const d = new Date(s.date);
      if (d >= weekStart && d <= now) total += getNetHours(s);
    });
    return Math.round(total * 10) / 10;
  }, []);

  // Get Monthly Hours
  const getMonthlyHours = useCallback((): number => {
    const now = new Date();
    let total = 0;
    MY_SCHEDULE.forEach(s => {
      const d = new Date(s.date);
      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        total += getNetHours(s);
      }
    });
    return Math.round(total * 10) / 10;
  }, []);

  const toggleCalendar = useCallback(() => {
    const toValue = calendarVisible ? 0 : 1;
    Animated.spring(calendarAnim, {
      toValue,
      useNativeDriver: false,
      tension: 80,
      friction: 12,
    }).start();
    setCalendarVisible(v => !v);
  }, [calendarAnim, calendarVisible]);

  // Format selected date for display
  const selectedDateFormatted = useMemo(
    () =>
      selectedDate
        ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })
        : '',
    [selectedDate],
  );

  // Calculate weekly and monthly hours
  const weeklyHrs = getWeeklyHours();
  const monthlyHrs = getMonthlyHours();

  // Count shifts in current month
  const shiftsThisMonth = useMemo(
    () =>
      MY_SCHEDULE.filter(s => {
        const d = new Date(s.date);
        const now = new Date();
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length,
    [],
  );

  return {
    getMonthlyHours,
    getWeeklyHours,
    selectedDate,
    setSelectedDate,
    calendarVisible,
    setCalendarVisible,
    calendarAnim,
    shift,
    toggleCalendar,
    markedDates,
    selectedDateFormatted,
    weeklyHrs,
    monthlyHrs,
    shiftsThisMonth,
  };
};
