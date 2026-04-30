import { StyleSheet, Text, View } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

export const SectionLabel: React.FC<{ text: string; required?: boolean }> = ({
  text,
  required,
}) => (
  <View style={styles.sectionLabelRow}>
    <Text style={styles.sectionLabel}>{text}</Text>
    {required && <Text style={styles.requiredDot}>*</Text>}
  </View>
);

const styles = StyleSheet.create({
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.25%'),
  },
  sectionLabel: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: wp('0.025%'),
  },
  requiredDot: {
    fontSize: wp('4%'),
    color: Colors.primary,
    marginLeft: wp('0.75%'),
    fontWeight: '700',
    lineHeight: hp('2.5%'),
  },
});
