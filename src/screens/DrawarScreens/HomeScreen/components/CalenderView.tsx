import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { Colors, hp, wp } from '../../../../constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CalenderView({
  setSelectedDate,
  markedDates,
}: {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  markedDates: Record<string, any>;
}) {
  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={styles.calendarWrapper}>
      <CalendarList
        horizontal
        pagingEnabled
        pastScrollRange={3}
        futureScrollRange={3}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        calendarWidth={SCREEN_WIDTH - wp(8)}
        theme={{
          calendarBackground: Colors.surface,
          textSectionTitleColor: Colors.textMuted,
          selectedDayBackgroundColor: Colors.primary,
          selectedDayTextColor: Colors.white,
          todayTextColor: Colors.primaryDark,
          todayBackgroundColor: Colors.primaryLight + '40',
          dayTextColor: Colors.text,
          textDisabledColor: '#ccc',
          dotColor: Colors.primary,
          selectedDotColor: Colors.white,
          arrowColor: Colors.primary,
          monthTextColor: Colors.text,
          textDayFontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
          textMonthFontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
          textDayHeaderFontFamily:
            Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 11,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'), // 20
    paddingVertical: hp('1.8%'), // 14
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.bg,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'), // 12
  },

  userAvatar: {
    width: wp('11%'), // ~44
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    backgroundColor: Colors.primary + '22',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userAvatarText: {
    fontSize: wp('3.8%'), // 15
    fontWeight: '800',
    color: Colors.primary,
  },

  greeting: {
    fontSize: wp('2.8%'), // 11
    color: Colors.textMuted,
    fontWeight: '500',
  },

  userName: {
    fontSize: wp('4.3%'), // 17
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  roleBadge: {
    backgroundColor: Colors.secondary + '22',
    borderRadius: wp('5%'),
    paddingHorizontal: wp('3%'), // 12
    paddingVertical: hp('0.6%'), // 5
    borderWidth: 1,
    borderColor: Colors.secondary + '44',
  },

  roleText: {
    fontSize: wp('3.3%'), // 13
    fontWeight: '700',
    color: Colors.secondaryDark,
  },

  scroll: {
    paddingTop: hp('2%'), // 16
  },

  statsRow: {
    flexDirection: 'row',
    gap: wp('2.5%'), // 10
    paddingHorizontal: wp('4%'), // 16
    marginBottom: hp('2.5%'), // 20
  },

  calendarToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.5%'), // 12
    gap: wp('2.5%'),
  },

  toggleLine: {
    flex: 1,
    height: hp('0.15%'), // ~1px responsive
    backgroundColor: Colors.border,
  },

  toggleLabel: {
    fontSize: wp('3%'), // 12
    color: Colors.primary,
    fontWeight: '700',
  },

  calendarWrapper: {
    marginHorizontal: wp('4%'),
    borderRadius: wp('4.5%'), // 18
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    marginBottom: hp('2%'),
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.07,
    shadowRadius: wp('3%'),
    elevation: 3,
  },

  dateLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('1.5%'),
    gap: wp('2%'),
  },

  dateLabelDot: {
    width: wp('2%'), // ~8
    height: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: Colors.primary,
  },

  dateLabel: {
    flex: 1,
    fontSize: wp('4%'), // 16
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  shiftPill: {
    backgroundColor: Colors.primary,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('2.5%'), // 10
    paddingVertical: hp('0.4%'), // 3
  },

  shiftPillText: {
    fontSize: wp('2.8%'), // 11
    color: '#fff',
    fontWeight: '700',
  },
});
