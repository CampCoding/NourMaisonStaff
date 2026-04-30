// components/SalaryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
import { formatCurrency } from '../../../../utiles/advanceUtiles';

interface SalaryCardProps {
  monthlySalary: number;
  maxAdvance: number;
}

const SalaryCard: React.FC<SalaryCardProps> = ({
  monthlySalary,
  maxAdvance,
}) => (
  <View style={styles.salaryCard}>
    <View style={styles.salaryCardLeft}>
      <Text style={styles.salaryCardLabel}>Monthly Salary</Text>
      <Text style={styles.salaryCardValue}>
        EGP {formatCurrency(monthlySalary)}
      </Text>
      <View style={styles.salaryBadge}>
        <Text style={styles.salaryBadgeText}>Max 50% advance eligible</Text>
      </View>
    </View>
    <View style={styles.salaryCardRight}>
      <Text style={styles.salaryLimitLabel}>Max Advance</Text>
      <Text style={styles.salaryLimitValue}>
        EGP {formatCurrency(maxAdvance)}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  salaryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: wp('4.5%'),
    padding: wp('4.5%'),
    marginBottom: hp('3%'),
    alignItems: 'center',
    overflow: 'hidden',
  },
  salaryCardLeft: { flex: 1 },
  salaryCardLabel: {
    fontSize: wp('3%'),
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    marginBottom: hp('0.5%'),
    letterSpacing: 0.5,
  },
  salaryCardValue: {
    fontSize: wp('5.5%'),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: hp('1%'),
  },
  salaryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: wp('5%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
  },
  salaryBadgeText: {
    fontSize: wp('2.75%'),
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  salaryCardRight: {
    alignItems: 'flex-end',
    paddingLeft: wp('3%'),
  },
  salaryLimitLabel: {
    fontSize: wp('2.75%'),
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    marginBottom: hp('0.5%'),
  },
  salaryLimitValue: {
    fontSize: wp('4.5%'),
    fontWeight: '800',
    color: Colors.primaryLight,
    letterSpacing: -0.3,
  },
});

export default SalaryCard;
