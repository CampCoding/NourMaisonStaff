import { StyleSheet, Text, View } from 'react-native';

import { Colors, hp, wp } from '../../../../constants';

export const StepChip: React.FC<{
  active: boolean;
  done: boolean;
  label: string;
  icon: string;
}> = ({ active, done, label, icon }) => (
  <View
    style={[
      styles.stepChip,
      done && styles.stepChipDone,
      active && !done && styles.stepChipActive,
    ]}
  >
    <Text style={styles.stepChipIcon}>{done ? '✓' : icon}</Text>
    <Text
      style={[
        styles.stepChipLabel,
        done && { color: Colors.secondary },
        active && !done && { color: Colors.primary },
      ]}
    >
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  stepChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.5%'),
    backgroundColor: Colors.gray,
    borderRadius: wp('2.5%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2.5%'),
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  stepChipActive: {
    backgroundColor: '#fff8ec',
    borderColor: Colors.primaryLight,
  },
  stepChipDone: {
    backgroundColor: Colors.cardPhotoBackground,
    borderColor: Colors.cardPhotoBorderColor,
    color: Colors.white,
  },
  stepChipIcon: {
    fontSize: wp('3.25%'),
  },
  stepChipLabel: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    color: Colors.textMuted,
    flex: 1,
  },
});
