import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InfoRow from './InfoRow';
import { formatCurrency } from '../../../../utiles/advanceUtiles';
import { Colors, hp, wp } from '../../../../constants';

interface DeductionCardProps {
  amount: number;
  repayment: string;
  monthlyDeduction: number;
  monthlySalary: number;
}

const DeductionCard: React.FC<DeductionCardProps> = ({
  amount,
  repayment,
  monthlyDeduction,
  monthlySalary,
}) => (
  <View style={styles.deductionCard}>
    <View style={styles.deductionHeader}>
      <Text style={styles.deductionTitle}>Repayment Summary</Text>
    </View>
    <InfoRow label="Advance Amount" value={`EGP ${formatCurrency(amount)}`} />
    <InfoRow
      label="Repayment Period"
      value={`${repayment} month${parseInt(repayment) > 1 ? 's' : ''}`}
    />
    <View style={styles.deductionSeparator} />
    <InfoRow
      label="Monthly Deduction"
      value={`EGP ${formatCurrency(monthlyDeduction)}`}
      accent={Colors.primaryDark}
    />
    <InfoRow
      label="Net Salary (est.)"
      value={`EGP ${formatCurrency(monthlySalary - monthlyDeduction)}`}
      accent={Colors.secondary}
    />
  </View>
);

const styles = StyleSheet.create({
  deductionCard: {
    backgroundColor: Colors.surface,
    borderRadius: wp('4%'),
    borderWidth: hp('0.12%'),
    borderColor: Colors.border,
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  deductionHeader: {
    marginBottom: hp('1.5%'),
  },
  deductionTitle: {
    fontSize: wp('3.25%'),
    fontWeight: '700',
    color: Colors.text,
  },
  deductionSeparator: {
    height: hp('0.12%'),
    backgroundColor: Colors.border,
    marginVertical: hp('1.25%'),
  },
});

export default DeductionCard;
