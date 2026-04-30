import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatCurrency } from '../../../../utiles/advanceUtiles';
import { Colors, hp, wp } from '../../../../constants';

interface QuickAmountsProps {
  amounts: number[];
  amountText: string;
  onQuickAmount: (val: number) => void;
}

const QuickAmounts: React.FC<QuickAmountsProps> = ({
  amounts,
  amountText,
  onQuickAmount,
}) => (
  <View style={styles.quickRow}>
    {amounts.map(val => (
      <TouchableOpacity
        key={val}
        style={[
          styles.quickChip,
          amountText === String(val) && styles.quickChipActive,
        ]}
        onPress={() => onQuickAmount(val)}
        activeOpacity={0.75}
      >
        <Text
          style={[
            styles.quickChipText,
            amountText === String(val) && styles.quickChipTextActive,
          ]}
        >
          {formatCurrency(val)}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  quickRow: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  quickChip: {
    flex: 1,
    paddingVertical: hp('1%'),
    borderRadius: wp('2.5%'),
    backgroundColor: Colors.gray3,
    alignItems: 'center',
    borderWidth: hp('0.18%'),
    borderColor: 'transparent',
  },
  quickChipActive: {
    backgroundColor: '#fff8ec',
    borderColor: Colors.primary,
  },
  quickChipText: {
    fontSize: wp('3.25%'),
    fontWeight: '600',
    color: Colors.textMuted,
  },
  quickChipTextActive: {
    color: Colors.primaryDark,
  },
});

export default QuickAmounts;
