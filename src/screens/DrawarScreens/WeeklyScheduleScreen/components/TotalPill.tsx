// components/TotalPill.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface TotalPillProps {
  totalDur: string;
  isPast: boolean;
}

export const TotalPill: React.FC<TotalPillProps> = ({ totalDur, isPast }) => (
  <View style={[styles.totalPill, isPast && styles.totalPillPast]}>
    <Text style={[styles.totalPillVal, isPast && { color: Colors.gray7 }]}>
      {totalDur}
    </Text>
    <Text style={[styles.totalPillLbl, isPast && { color: Colors.gray7 }]}>
      TOTAL
    </Text>
  </View>
);

const styles = StyleSheet.create({
  totalPill: {
    alignItems: 'center',
    backgroundColor: Colors.surface2,
    borderRadius: wp(2.5),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.75),
    borderWidth: wp(0.25),
    borderColor: Colors.border,
    minWidth: wp(13.5),
  },
  totalPillPast: {
    backgroundColor: Colors.gray3,
    borderColor: Colors.gray2,
  },
  totalPillVal: {
    fontSize: wp(3.75),
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  totalPillLbl: {
    fontSize: wp(2.25),
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: wp(0.2),
  },
});
