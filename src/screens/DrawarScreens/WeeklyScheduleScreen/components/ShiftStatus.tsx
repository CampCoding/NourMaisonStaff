import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface ShiftStatusProps {
  isPast: boolean;
  isToday: boolean;
  weekdayLong: string;
}

export const ShiftStatus: React.FC<ShiftStatusProps> = ({
  isPast,
  isToday,
  weekdayLong,
}) => (
  <View style={styles.cardHeaderMid}>
    <Text style={[styles.weekdayLong, isPast && { color: '#b0aaa2' }]}>
      {weekdayLong}
    </Text>
    <View style={styles.statusRow}>
      <View
        style={[
          styles.statusDot,
          isPast
            ? styles.dotPast
            : isToday
            ? styles.dotToday
            : styles.dotFuture,
        ]}
      />
      <Text
        style={[
          styles.statusText,
          isPast
            ? styles.statusTextPast
            : isToday
            ? styles.statusTextToday
            : styles.statusTextFuture,
        ]}
      >
        {isPast ? 'Completed' : isToday ? 'On Shift' : 'Upcoming'}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardHeaderMid: { flex: 1, gap: hp(0.5) },
  weekdayLong: { fontSize: wp(4), fontWeight: '700', color: Colors.text },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: wp(1.25) },
  statusDot: { width: wp(1.75), height: wp(1.75), borderRadius: wp(1) },
  dotPast: { backgroundColor: Colors.gray7 },
  dotToday: { backgroundColor: Colors.secondary },
  dotFuture: { backgroundColor: Colors.primaryLight },
  statusText: { fontSize: wp(2.75), fontWeight: '600' },
  statusTextPast: { color: Colors.gray7 },
  statusTextToday: { color: Colors.secondaryDark },
  statusTextFuture: { color: Colors.textMuted },
});
