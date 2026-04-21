import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Colors } from '../../../constants';
import { StatPill } from './components/StatPill';
import { ShiftDetailCard } from './components/ShiftDetailCard';
import { RestDayCard } from './components/RestDayCard';
import { UpcomingStrip } from './components/UpcomingStrip';
import Header from './components/Header';
import CalenderView from './components/CalenderView';
import { useHomeScreen } from './hook';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// ─── Main Screen ───────────────────────────────────────────────────────────────
const MyScheduleScreen: React.FC = () => {
  const {
    setSelectedDate,
    calendarVisible,
    shift,
    toggleCalendar,
    markedDates,
    selectedDateFormatted,
    weeklyHrs,
    monthlyHrs,
    shiftsThisMonth,
  } = useHomeScreen();

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <StatPill
            label="This Week"
            value={`${weeklyHrs}h`}
            sub="worked"
            accent
          />
          <StatPill label="This Month" value={`${monthlyHrs}h`} sub="worked" />
          <StatPill
            label="Shifts"
            value={`${shiftsThisMonth}`}
            sub="scheduled"
          />
        </View>

        {/* ── Upcoming Strip ── */}
        <UpcomingStrip onSelectDate={setSelectedDate} />

        {/* ── Calendar toggle ── */}
        <TouchableOpacity
          style={styles.calendarToggleRow}
          onPress={toggleCalendar}
          activeOpacity={0.7}
        >
          <View style={styles.toggleLine} />
          <Text style={styles.toggleLabel}>
            {calendarVisible ? '▲  Hide Calendar' : '▼  Show Calendar'}
          </Text>
          <View style={styles.toggleLine} />
        </TouchableOpacity>

        {calendarVisible ? (
          <CalenderView
            markedDates={markedDates}
            setSelectedDate={setSelectedDate}
          />
        ) : (
          <></>
        )}
        {/* ── Selected date label ── */}
        <View style={styles.dateLabelRow}>
          <View style={styles.dateLabelDot} />
          <Text style={styles.dateLabel}>{selectedDateFormatted}</Text>
          {shift && (
            <View style={styles.shiftPill}>
              <Text style={styles.shiftPillText}>Shift day</Text>
            </View>
          )}
        </View>

        {/* ── Shift or Rest Card ── */}
        {shift ? <ShiftDetailCard shift={shift} /> : <RestDayCard />}

        <View style={{ height: hp('4%') }} />
      </ScrollView>
    </View>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
    // paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5.33%'),
    paddingVertical: hp('1.8%'),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.bg,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: wp('3.2%') }, // 12px
  userAvatar: {
    width: wp('11.73%'),
    height: wp('11.73%'),
    borderRadius: wp('5.86%'),
    backgroundColor: Colors.primary + '22',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: wp('4%'),
    fontWeight: '800',
    color: Colors.primary,
  },
  greeting: {
    fontSize: wp('2.93%'),
    color: Colors.textMuted,
    fontWeight: '500',
  },
  userName: {
    fontSize: wp('4.53%'),
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  roleBadge: {
    backgroundColor: Colors.secondary + '22',
    borderRadius: wp('5.33%'),
    paddingHorizontal: wp('3.2%'),
    paddingVertical: hp('0.62%'),
    borderWidth: 1,
    borderColor: Colors.secondary + '44',
  },
  roleText: {
    fontSize: wp('3.47%'),
    fontWeight: '700',
    color: Colors.secondaryDark,
  },

  scroll: { paddingTop: hp('2.1%') },

  statsRow: {
    flexDirection: 'row',
    gap: wp('2.67%'),
    paddingHorizontal: wp('4.27%'),
    marginBottom: hp('2.46%'),
  },

  calendarToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4.27%'),
    marginBottom: hp('1.48%'),
    gap: wp('2.67%'),
  },
  toggleLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  toggleLabel: {
    fontSize: wp('3.2%'),
    color: Colors.primary,
    fontWeight: '700',
  },

  calendarWrapper: {
    marginHorizontal: wp('4.27%'),
    borderRadius: wp('4.8%'),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    marginBottom: hp('1.97%'),
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.49%') }, // 4px
    shadowOpacity: 0.07,
    shadowRadius: wp('3.2%'),
    elevation: 3,
  },

  dateLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5.33%'),
    marginBottom: hp('1.48%'),
    gap: wp('2.13%'),
  },
  dateLabelDot: {
    width: wp('2.13%'),
    height: wp('2.13%'),
    borderRadius: wp('1.07%'),
    backgroundColor: Colors.primary,
  },
  dateLabel: {
    flex: 1,
    fontSize: wp('4.27%'),
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  shiftPill: {
    backgroundColor: Colors.primary,
    borderRadius: wp('3.2%'),
    paddingHorizontal: wp('2.67%'),
    paddingVertical: hp('0.37%'),
  },
  shiftPillText: { fontSize: wp('2.93%'), color: '#fff', fontWeight: '700' }, // 11px
});

export default MyScheduleScreen;
