import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText } from '../../../../component/CustomText';
import { Colors } from '../../../../constants';

export const Row: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.successRow}>
    <CustomText style={styles.successRowLabel}>{label}</CustomText>
    <CustomText style={styles.successRowValue}>{value}</CustomText>
  </View>
);

const styles = StyleSheet.create({
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  successRowLabel: {
    fontSize: wp('3.5%'),
    color: Colors.textMuted,
    fontWeight: '500',
  },
  successRowValue: {
    fontSize: wp('3.5%'),
    color: Colors.text,
    fontWeight: '700',
  },
});
