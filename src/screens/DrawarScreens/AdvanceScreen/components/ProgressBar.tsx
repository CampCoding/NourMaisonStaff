import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../../../../utiles/advanceUtiles';
import { Colors, hp, wp } from '../../../../constants';

interface ProgressBarProps {
  amount: number;
  maxAdvance: number;
  isOverLimit: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  amount,
  maxAdvance,
  isOverLimit,
}) => {
  const fillPercent = Math.min((amount / maxAdvance) * 100, 100);

  return (
    <>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${fillPercent}%`,
              backgroundColor: isOverLimit ? '#e06b6b' : Colors.primary,
            },
          ]}
        />
      </View>
      <View style={styles.progressLabels}>
        <Text style={styles.progressLabelLeft}>EGP 0</Text>
        <Text
          style={[
            styles.progressLabelRight,
            { color: isOverLimit ? '#e06b6b' : Colors.textMuted },
          ]}
        >
          {isOverLimit
            ? `Over by EGP ${formatCurrency(amount - maxAdvance)}`
            : `EGP ${formatCurrency(maxAdvance - amount)} remaining`}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  progressTrack: {
    height: hp('0.75%'),
    backgroundColor: Colors.gray3,
    borderRadius: wp('0.75%'),
    overflow: 'hidden',
    marginBottom: hp('0.75%'),
  },
  progressFill: {
    height: '100%',
    borderRadius: wp('0.75%'),
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.75%'),
  },
  progressLabelLeft: { fontSize: wp('2.75%'), color: Colors.textMuted },
  progressLabelRight: { fontSize: wp('2.75%'), fontWeight: '600' },
});

export default ProgressBar;
