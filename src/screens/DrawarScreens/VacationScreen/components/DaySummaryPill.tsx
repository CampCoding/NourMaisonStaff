import { StyleSheet, Text, View } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

export const DaySummaryPill: React.FC<{ count: number }> = ({ count }) => (
  <View style={styles.daySummaryPill}>
    <Text style={styles.daySummaryCount}>{count}</Text>
    <Text style={styles.daySummaryLabel}>
      {count === 1 ? 'Working Day' : 'Working Days'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  daySummaryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: wp('6%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    marginTop: hp('1.5%'),
    gap: wp('1.5%'),
  },
  daySummaryCount: {
    fontSize: wp('4%'),
    fontWeight: '800',
    color: '#fff',
  },
  daySummaryLabel: {
    fontSize: wp('3.25%'),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
});
