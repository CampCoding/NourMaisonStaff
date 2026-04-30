import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
import InfoRow from './InfoRow';
import { REASON_OPTIONS, REPAYMENT_OPTIONS } from '../data';
import { formatCurrency } from '../../../../utiles/advanceUtiles';

interface SuccessScreenProps {
  amount: number;
  reason: string | null;
  repayment: string;
  monthlyDeduction: number;
  onNewRequest: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  amount,
  reason,
  repayment,
  monthlyDeduction,
  onNewRequest,
}) => {
  const reasonObj = REASON_OPTIONS.find(r => r.key === reason);
  const repayOpt = REPAYMENT_OPTIONS.find(r => r.key === repayment);

  return (
    <ScrollView contentContainerStyle={styles.successScroll}>
      <View style={styles.successIconWrap}>
        <Text style={styles.successEmoji}>💰</Text>
      </View>
      <Text style={styles.successTitle}>Request Submitted!</Text>
      <Text style={styles.successSub}>
        Your advance request is under review. HR will respond within 1–2
        business days.
      </Text>

      <View style={styles.successCard}>
        <View style={styles.successAmountBlock}>
          <Text style={styles.successAmountLabel}>Requested Amount</Text>
          <Text style={styles.successAmount}>EGP {formatCurrency(amount)}</Text>
        </View>
        <View style={styles.successDivider} />
        <InfoRow
          label="Reason"
          value={`${reasonObj?.icon} ${reasonObj?.label}`}
        />
        <InfoRow label="Repayment" value={repayOpt?.label ?? ''} />
        <InfoRow
          label="Monthly Deduction"
          value={`EGP ${formatCurrency(monthlyDeduction)}`}
          accent={Colors.primaryDark}
        />
        <InfoRow label="Status" value="🟡 Pending Approval" />
      </View>

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={onNewRequest}
        activeOpacity={0.85}
      >
        <Text style={styles.submitBtnText}>New Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  successScroll: {
    padding: wp('7%'),
    alignItems: 'center',
    paddingBottom: hp('6%'),
  },
  successIconWrap: {
    width: wp('21%'),
    height: wp('21%'),
    borderRadius: wp('10.5%'),
    backgroundColor: '#fff8ec',
    borderWidth: hp('0.25%'),
    borderColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2.5%'),
    marginTop: hp('2.5%'),
  },
  successEmoji: { fontSize: wp('9.5%') },
  successTitle: {
    fontSize: wp('6.5%'),
    fontWeight: '800',
    color: Colors.text,
    marginBottom: hp('1%'),
    letterSpacing: -0.5,
  },
  successSub: {
    fontSize: wp('3.5%'),
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: hp('2.75%'),
    marginBottom: hp('3.5%'),
  },
  successCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: wp('4.5%'),
    borderWidth: hp('0.12%'),
    borderColor: Colors.border,
    padding: wp('1.5%'),
    marginBottom: hp('2.5%'),
    overflow: 'hidden',
  },
  successAmountBlock: {
    backgroundColor: Colors.primary,
    borderRadius: wp('3.5%'),
    padding: wp('4%'),
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  successAmountLabel: {
    fontSize: wp('3%'),
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    marginBottom: hp('0.5%'),
    letterSpacing: 0.5,
  },
  successAmount: {
    fontSize: wp('7%'),
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  successDivider: {
    height: hp('0.12%'),
    backgroundColor: Colors.border,
    marginHorizontal: wp('2.5%'),
    marginVertical: hp('1.25%'),
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    width: wp('86%'),
    borderRadius: wp('4%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp('0.75%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('3%'),
    elevation: 6,
    marginBottom: hp('1.5%'),
  },
  submitBtnText: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
});

export default SuccessScreen;
