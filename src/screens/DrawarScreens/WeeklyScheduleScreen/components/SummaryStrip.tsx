// components/SummaryStrip.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface SummaryStripProps {
  totalLabel: string;
}

export const SummaryStrip: React.FC<SummaryStripProps> = ({ totalLabel }) => (
  <View style={styles.summaryStrip}>
    <View style={styles.summaryItem}>
      <Text style={styles.summaryVal}>5</Text>
      <Text style={styles.summaryLbl}>Shifts</Text>
    </View>
    <View style={styles.summaryLine} />
    <View style={styles.summaryItem}>
      <Text style={styles.summaryVal}>{totalLabel}</Text>
      <Text style={styles.summaryLbl}>Work Time</Text>
    </View>
    <View style={styles.summaryLine} />
    <View style={styles.summaryItem}>
      <Text style={styles.summaryVal}>Mon–Fri</Text>
      <Text style={styles.summaryLbl}>Schedule</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  summaryStrip: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    backgroundColor: Colors.primary,
    borderRadius: wp(3.5),
    paddingVertical: hp(1.5),
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryVal: { fontSize: wp(4.5), fontWeight: '800', color: Colors.white },
  summaryLbl: {
    fontSize: wp(2.5),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: wp(0.2),
    marginTop: hp(0.25),
  },
  summaryLine: {
    width: wp(0.25),
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: hp(0.5),
  },
});
