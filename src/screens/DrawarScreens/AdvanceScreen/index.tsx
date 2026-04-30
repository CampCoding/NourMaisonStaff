// MainScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, hp, wp } from '../../../constants';
import PagesHeader from '../../../component/PagesHeader';
import SectionLabel from './components/SectionLabel';
import SalaryCard from './components/SalaryCard';
import AmountInput from './components/AmountInput';
import ProgressBar from './components/ProgressBar';
import QuickAmounts from './components/QuickAmounts';
import ReasonSelector from './components/ReasonSelector';
import RepaymentSelector from './components/RepaymentSelector';
import DeductionCard from './components/DeductionCard';
import SuccessScreen from './components/SuccessScreen';
import PolicyNote from './components/PolicyNote';
import { AdvanceReason, RepaymentPlan } from './types';
import {
  MAX_ADVANCE,
  MONTHLY_SALARY,
  QUICK_AMOUNTS,
  REASON_OPTIONS,
  REPAYMENT_OPTIONS,
} from './data';
import { formatCurrency, parseAmount } from '../../../utiles/advanceUtiles';

const AdvanceRequestScreen: React.FC = () => {
  const [amountText, setAmountText] = useState<string>('');
  const [reason, setReason] = useState<AdvanceReason | null>(null);
  const [repayment, setRepayment] = useState<RepaymentPlan>('1');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const amount = parseAmount(amountText);
  const isOverLimit = amount > MAX_ADVANCE;
  const isValid = amount > 0 && amount <= MAX_ADVANCE && reason !== null;
  const monthlyDeduction = repayment ? amount / parseInt(repayment) : 0;

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setAmountText(cleaned);
  };

  const handleQuickAmount = (val: number) => {
    setAmountText(String(val));
  };

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessScreen
        amount={amount}
        reason={reason}
        repayment={repayment}
        monthlyDeduction={monthlyDeduction}
        onNewRequest={() => {
          setSubmitted(false);
          setAmountText('');
          setReason(null);
          setRepayment('1');
          setNotes('');
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <PagesHeader name="Salary Advance" subName="Request an early payment" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SalaryCard monthlySalary={MONTHLY_SALARY} maxAdvance={MAX_ADVANCE} />

        <View style={styles.section}>
          <SectionLabel
            text="Advance Amount"
            required
            note={isOverLimit ? '  ⚠ Exceeds limit' : ''}
          />
          <AmountInput
            amountText={amountText}
            isOverLimit={isOverLimit}
            onAmountChange={handleAmountChange}
          />
          <ProgressBar
            amount={amount}
            maxAdvance={MAX_ADVANCE}
            isOverLimit={isOverLimit}
          />
          <QuickAmounts
            amounts={QUICK_AMOUNTS}
            amountText={amountText}
            onQuickAmount={handleQuickAmount}
          />
        </View>

        <View style={styles.section}>
          <SectionLabel text="Reason for Advance" required />
          <ReasonSelector
            options={REASON_OPTIONS}
            selectedReason={reason}
            onSelectReason={setReason}
          />
        </View>

        <View style={styles.section}>
          <SectionLabel text="Repayment Plan" />
          <RepaymentSelector
            options={REPAYMENT_OPTIONS}
            selectedRepayment={repayment}
            amount={amount}
            onSelectRepayment={setRepayment}
          />
        </View>

        {amount > 0 && !isOverLimit && (
          <DeductionCard
            amount={amount}
            repayment={repayment}
            monthlyDeduction={monthlyDeduction}
            monthlySalary={MONTHLY_SALARY}
          />
        )}

        <View style={styles.section}>
          <SectionLabel text="Additional Notes" />
          <TextInput
            style={styles.textArea}
            placeholder="Any supporting details for HR or finance..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        <PolicyNote />

        <TouchableOpacity
          style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!isValid}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>
            {!isValid
              ? amount === 0
                ? 'Enter an Amount'
                : !reason
                ? 'Select a Reason'
                : isOverLimit
                ? 'Amount Exceeds Limit'
                : 'Submit Request'
              : `Submit — EGP ${formatCurrency(amount)}`}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Processing typically takes 1–2 business days after approval.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('6%'),
    paddingTop: hp('2%'),
  },
  section: { marginBottom: hp('3%') },
  textArea: {
    backgroundColor: Colors.surface,
    borderRadius: wp('3.5%'),
    borderWidth: hp('0.12%'),
    borderColor: Colors.border,
    padding: wp('3.5%'),
    fontSize: wp('3.5%'),
    color: Colors.text,
    minHeight: hp('11%'),
    lineHeight: hp('2.75%'),
  },
  submitBtn: {
    backgroundColor: Colors.primary,
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
  submitBtnDisabled: {
    backgroundColor: Colors.gray2,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  footerNote: {
    fontSize: wp('3%'),
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: hp('2.25%'),
  },
});

export default AdvanceRequestScreen;
