// components/TimeBlock.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface TimeBlockProps {
  label: string;
  start: string;
  end: string;
  duration: string;
  icon: string;
  color: string;
  isPast: boolean;
}

export const TimeBlock: React.FC<TimeBlockProps> = ({
  label,
  start,
  end,
  duration,
  icon,
  color,
  isPast,
}) => (
  <View style={styles.timeBlock}>
    <View style={styles.blockLabelRow}>
      <View
        style={[
          styles.blockDot,
          { backgroundColor: isPast ? Colors.gray7 : color },
        ]}
      />
      <Text style={[styles.blockLabel, isPast && styles.textMutedPast]}>
        {label}
      </Text>
    </View>
    <Text style={[styles.blockTime, isPast && { color: '#b0aaa2' }]}>
      {start}
      <Text style={styles.blockArrow}> → </Text>
      {end}
    </Text>
    <View style={[styles.durationTag, isPast && styles.durationTagPast]}>
      <Text style={[styles.durationTagTxt, isPast && { color: Colors.gray7 }]}>
        {icon} {duration}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  timeBlock: { flex: 1, gap: hp(0.75), paddingHorizontal: wp(1) },
  blockLabelRow: { flexDirection: 'row', alignItems: 'center', gap: wp(1.25) },
  blockDot: { width: wp(1.5), height: wp(1.5), borderRadius: wp(0.75) },
  blockLabel: {
    fontSize: wp(2.25),
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: wp(0.25),
  },
  blockTime: {
    fontSize: wp(4.25),
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.075,
  },
  blockArrow: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: Colors.textMuted,
  },
  durationTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface2,
    borderRadius: wp(1.5),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.375),
    borderWidth: wp(0.25),
    borderColor: Colors.border,
  },
  durationTagPast: {
    backgroundColor: Colors.gray3,
    borderColor: Colors.gray2,
  },
  durationTagTxt: {
    fontSize: wp(2.75),
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  textMutedPast: { color: Colors.gray7 },
});
