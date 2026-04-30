import { StyleSheet, Text, View } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

export const BalanceItem: React.FC<{
  label: string;
  value: string;
  accent: string;
}> = ({ label, value, accent }) => (
  <View style={styles.balanceItem}>
    <Text style={[styles.balanceValue, { color: accent }]}>{value}</Text>
    <Text style={styles.balanceLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: wp('5.5%'),
    fontWeight: '800',
    letterSpacing: wp('-0.125%'),
  },
  balanceLabel: {
    fontSize: wp('2.75%'),
    color: Colors.textMuted,
    marginTop: hp('0.25%'),
    fontWeight: '500',
  },
});
