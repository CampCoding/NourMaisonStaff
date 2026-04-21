import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
import { getNetHours, today } from '../../../../utiles/homeUtiles';
import { MY_SCHEDULE } from '../data';

export const UpcomingStrip = ({
  onSelectDate,
}: {
  onSelectDate: (d: string) => void;
}) => {
  const upcoming = MY_SCHEDULE.filter(s => s.date >= today).slice(0, 5);
  return (
    <View style={upStyles.container}>
      <Text style={upStyles.title}>Upcoming Shifts</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={upStyles.scroll}
      >
        {upcoming.map(s => {
          const d = new Date(s.date + 'T00:00:00');
          const day = d.toLocaleDateString('en-US', { weekday: 'short' });
          const num = d.getDate();
          const hours = getNetHours(s).toFixed(1);
          return (
            <TouchableOpacity
              key={s.date}
              style={upStyles.chip}
              onPress={() => onSelectDate(s.date)}
              activeOpacity={0.7}
            >
              <Text style={upStyles.chipDay}>{day}</Text>
              <Text style={upStyles.chipNum}>{num}</Text>
              <View style={upStyles.chipHours}>
                <Text style={upStyles.chipHoursText}>{hours}h</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const upStyles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.97%'),
  },
  title: {
    fontSize: wp('3.47%'),
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: wp('0.27%'),
    marginBottom: hp('1%'),
  },
  scroll: { gap: wp('2.13%'), paddingRight: wp('2.13%') },
  chip: {
    backgroundColor: Colors.surface,
    borderRadius: wp('3.73%'),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp('3.2%'),
    alignItems: 'center',
    minWidth: wp('15.47%'),
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp('0.25%') },
    shadowOpacity: 0.06,
    shadowRadius: wp('1.6%'),
    elevation: 1,
  },
  chipDay: {
    fontSize: wp('2.5%'),
    color: Colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  chipNum: {
    fontSize: wp('5.5%'),
    fontWeight: '800',
    color: Colors.text,
    marginVertical: hp('0.49%'),
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  chipHours: {
    backgroundColor: Colors.primary,
    borderRadius: wp('2.13%'),
    paddingHorizontal: wp('1.6%'),
    paddingVertical: hp('0.25%'),
  },
  chipHoursText: { fontSize: wp('2.5%'), color: '#fff', fontWeight: '700' },
});
