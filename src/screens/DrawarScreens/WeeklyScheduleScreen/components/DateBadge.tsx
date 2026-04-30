// components/DateBadge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface DateBadgeProps {
  weekday: string;
  day: string;
  month: string;
  isPast: boolean;
  isToday: boolean;
}

export const DateBadge: React.FC<DateBadgeProps> = ({
  weekday,
  day,
  month,
  isPast,
  isToday,
}) => (
  <View
    style={[
      styles.dateBadge,
      isPast && styles.dateBadgePast,
      isToday && styles.dateBadgeToday,
    ]}
  >
    <Text
      style={[
        styles.dateBadgeWeekday,
        isPast && styles.textMutedPast,
        isToday && { color: 'rgba(255,255,255,0.8)' },
      ]}
    >
      {weekday}
    </Text>
    <Text
      style={[
        styles.dateBadgeNum,
        isPast && { color: '#b0aaa2' },
        isToday && { color: Colors.white },
      ]}
    >
      {day}
    </Text>
    <Text
      style={[
        styles.dateBadgeMonth,
        isPast && styles.textMutedPast,
        isToday && { color: 'rgba(255,255,255,0.65)' },
      ]}
    >
      {month}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  dateBadge: {
    width: wp(13.5),
    height: hp(8),
    backgroundColor: Colors.surface2,
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.25),
    borderColor: Colors.border,
  },
  dateBadgePast: {
    backgroundColor: Colors.gray3,
    borderColor: Colors.gray2,
  },
  dateBadgeToday: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  dateBadgeWeekday: {
    fontSize: wp(2.25),
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: wp(0.25),
  },
  dateBadgeNum: {
    fontSize: wp(6),
    fontWeight: '900',
    color: Colors.text,
    lineHeight: hp(3.25),
  },
  dateBadgeMonth: {
    fontSize: wp(2.25),
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: wp(0.125),
  },
  textMutedPast: { color: Colors.gray7 },
});
