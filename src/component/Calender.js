import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '../constants/Colors';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const startCalender = tomorrow.toISOString().split('T')[0];
const today = new Date().toISOString().split('T')[0];
export default function CalendarComponent({
  startDate,
  setStartDate,
  setEndDate,
  endDate,
  CalendarDisable = false,
}) {
  const onDayPress = day => {
    if (CalendarDisable) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else {
      if (day.dateString >= startDate) {
        setEndDate(day.dateString);
      } else {
        setStartDate(day.dateString);
      }
    }
  };

  const getMarkedDates = () => {
    let markedDates = { [today]: { marked: true } };

    if (startDate && !endDate) {
      markedDates[startDate] = {
        startingDay: true,
        endingDay: true,
        color: Colors.secondary,
        textColor: 'white',
      };
    }

    if (startDate && endDate) {
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        const dateString = currentDate.toISOString().split('T')[0];

        if (dateString === startDate) {
          markedDates[dateString] = {
            startingDay: true,
            color: Colors.secondary,
            textColor: 'white',
          };
        } else if (dateString === endDate) {
          markedDates[dateString] = {
            endingDay: true,
            color: Colors.secondary,
            textColor: 'white',
          };
        } else {
          markedDates[dateString] = {
            color: Colors.secondaryLight,
            textColor: 'white',
          };
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return markedDates;
  };

  return (
    <Calendar
      markingType="period"
      markedDates={getMarkedDates()}
      onDayPress={onDayPress}
      hideArrows={false}
      minDate={startCalender}
      enableSwipeMonths={true}
      // maxDate={subscription.end_date}
      disabledByDefault={CalendarDisable}
      theme={{
        calendarBackground: Colors.background1,
        dayTextColor: Colors.text,
        monthTextColor: Colors.text,
        arrowColor: Colors.primary,
      }}
    />
  );
}
