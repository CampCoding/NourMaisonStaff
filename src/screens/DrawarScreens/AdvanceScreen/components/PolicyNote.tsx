// components/PolicyNote.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

const PolicyNote: React.FC = () => (
  <View style={styles.policyCard}>
    <Text style={styles.policyText}>
      Salary advances are subject to HR policy and manager approval. Deductions
      begin the following payroll cycle.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  policyCard: {
    flexDirection: 'row',
    gap: wp('2.5%'),
    backgroundColor: Colors.surface2,
    borderRadius: wp('3%'),
    padding: wp('3.5%'),
    marginBottom: hp('3%'),
    borderWidth: hp('0.12%'),
    borderColor: Colors.border,
    alignItems: 'flex-start',
  },
  policyIcon: { fontSize: wp('4%'), marginTop: hp('0.12%') },
  policyText: {
    flex: 1,
    fontSize: wp('3%'),
    color: Colors.textMuted,
    lineHeight: hp('2.25%'),
  },
});

export default PolicyNote;
