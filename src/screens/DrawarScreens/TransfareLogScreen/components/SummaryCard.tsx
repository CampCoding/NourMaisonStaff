import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransferRecord } from '../types';
import { formatCurrency, typeConfig } from '../data';
import { Colors, hp, wp } from '../../../../constants';

interface SummaryCardProps {
  transfers: TransferRecord[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ transfers }) => {
  const totalSalary = transfers
    .filter(t => t.type === 'salary' && t.status === 'completed')
    .reduce((s, t) => s + t.amount, 0);
  const totalAdvance = transfers
    .filter(t => t.type === 'advance' && t.status === 'completed')
    .reduce((s, t) => s + t.amount, 0);
  const netPay = totalSalary - totalAdvance;

  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryStripe} />
      <Text style={styles.summaryTitle}>Summary</Text>
      <Text style={styles.summarySubtitle}>All-time completed transfers</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <View
            style={[
              styles.summaryDot,
              { backgroundColor: typeConfig.salary.color },
            ]}
          />
          <Text style={styles.summaryLabel}>Total Salary</Text>
          <Text
            style={[styles.summaryAmount, { color: typeConfig.salary.color }]}
          >
            {formatCurrency(totalSalary)}
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <View
            style={[
              styles.summaryDot,
              { backgroundColor: typeConfig.advance.color },
            ]}
          />
          <Text style={styles.summaryLabel}>Total Advances</Text>
          <Text
            style={[styles.summaryAmount, { color: typeConfig.advance.color }]}
          >
            − {formatCurrency(totalAdvance)}
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: Colors.text }]} />
          <Text style={styles.summaryLabel}>Net Pay</Text>
          <Text style={[styles.summaryAmount, { color: Colors.text }]}>
            {formatCurrency(netPay)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    marginBottom: hp(1),
    backgroundColor: Colors.surface,
    borderRadius: wp(4),
    padding: wp(5),
    paddingTop: wp(4),
    borderWidth: wp(0.25),
    borderColor: Colors.border,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.06,
    shadowRadius: wp(2),
    elevation: 3,
  },
  summaryStripe: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // height: hp(0.5),
    // backgroundColor: Colors.primary,
    // borderTopLeftRadius: wp(4),
    // borderTopRightRadius: wp(4),
  },
  summaryTitle: {
    fontSize: hp(2.4),
    fontWeight: '700',
    color: Colors.text,
    marginTop: hp(0.5),
  },
  summarySubtitle: {
    fontSize: hp(1.8),
    color: Colors.textMuted,
    marginBottom: hp(2),
    marginTop: hp(0.25),
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    marginBottom: hp(0.75),
  },
  summaryLabel: {
    fontSize: hp(1.7),
    color: Colors.textMuted,
    fontWeight: '500',
    marginBottom: hp(0.5),
    textAlign: 'center',
  },
  summaryAmount: {
    fontSize: hp(2),
    fontWeight: '700',
    textAlign: 'center',
  },
  summaryDivider: {
    width: wp(0.25),
    height: hp(6),
    backgroundColor: Colors.border,
    marginHorizontal: wp(1),
  },
});
