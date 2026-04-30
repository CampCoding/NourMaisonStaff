// components/RepaymentSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RepaymentPlan } from '../types';
import { formatCurrency } from '../../../../utiles/advanceUtiles';
import { Colors, hp, wp } from '../../../../constants';

interface RepaymentOption {
  key: RepaymentPlan;
  label: string;
  sublabel: string;
}

interface RepaymentSelectorProps {
  options: RepaymentOption[];
  selectedRepayment: RepaymentPlan;
  amount: number;
  onSelectRepayment: (key: RepaymentPlan) => void;
}

const RepaymentSelector: React.FC<RepaymentSelectorProps> = ({
  options,
  selectedRepayment,
  amount,
  onSelectRepayment,
}) => (
  <View style={styles.repayRow}>
    {options.map(opt => {
      const selected = selectedRepayment === opt.key;
      const monthly = amount > 0 ? amount / parseInt(opt.key) : 0;
      return (
        <TouchableOpacity
          key={opt.key}
          style={[styles.repayCard, selected && styles.repayCardSelected]}
          onPress={() => onSelectRepayment(opt.key)}
          activeOpacity={0.75}
        >
          <Text
            style={[styles.repayLabel, selected && styles.repayLabelSelected]}
          >
            {opt.label}
          </Text>
          <Text style={[styles.repaySub, selected && styles.repaySubSelected]}>
            {opt.sublabel}
          </Text>
          {amount > 0 && (
            <Text
              style={[
                styles.repayAmount,
                selected && styles.repayAmountSelected,
              ]}
            >
              EGP {formatCurrency(monthly)}/mo
            </Text>
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  repayRow: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  repayCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: wp('3.5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('1.5%'),
    alignItems: 'center',
    borderWidth: hp('0.18%'),
    borderColor: Colors.border,
  },
  repayCardSelected: {
    backgroundColor: '#fff8ec',
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp('0.37%') },
    shadowOpacity: 0.15,
    shadowRadius: wp('1.5%'),
    elevation: 3,
  },
  repayLabel: {
    fontSize: wp('3.25%'),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: hp('0.25%'),
  },
  repayLabelSelected: { color: Colors.primaryDark },
  repaySub: {
    fontSize: wp('2.5%'),
    color: Colors.textMuted,
    marginBottom: hp('0.5%'),
  },
  repaySubSelected: { color: Colors.textMuted },
  repayAmount: {
    fontSize: wp('2.5%'),
    fontWeight: '700',
    color: Colors.textMuted,
  },
  repayAmountSelected: { color: Colors.primary },
});

export default RepaymentSelector;
