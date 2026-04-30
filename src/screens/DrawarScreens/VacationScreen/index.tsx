import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { Colors, hp, wp } from '../../../constants';
import { VacationType } from './types';
// import { VACATION_TYPES } from './data';
// import { VacationTypeCard } from './components/VacationTypeCard';
import { SectionLabel } from './components/SectionLabel';
import { countWeekdays } from '../../../utiles/vacationUtiles';
import PagesHeader from '../../../component/PagesHeader';
import SubmitDone from './components/SubmitDone';
import FullButton from '../../../component/FullButton';
import Calender from './components/Calender';
// import { BalanceItem } from './components/BalanceItem';
import OutlineButton from '../../../component/OutlineButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const VacationRequestScreen: React.FC = () => {
  const [vacationType, setVacationType] = useState<VacationType>('annual');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectingStart, setSelectingStart] = useState<boolean>(true);
  const [reason, setReason] = useState<string>('');
  const [handover, setHandover] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const workingDays = useMemo(
    () =>
      startDate && endDate
        ? countWeekdays(startDate, endDate)
        : startDate
        ? 1
        : 0,
    [startDate, endDate],
  );

  const resetDates = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectingStart(true);
  }, []);

  const canSubmit = useMemo(
    () => startDate && endDate && reason.trim().length > 0,
    [startDate, endDate, reason],
  );

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    setSubmitted(true);
  }, [canSubmit]);

  if (submitted) {
    return (
      <SubmitDone
        onEnd={() => {
          setSubmitted(false);
          setStartDate(null);
          setEndDate(null);
          setReason('');
          setHandover('');
          setSelectingStart(true);
        }}
        vacationType={vacationType}
        startDate={startDate}
        endDate={endDate}
        workingDays={workingDays}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      {/* Header */}
      <PagesHeader
        name={'Request Vacation'}
        subName={'Fill in the details below'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <OutlineButton name={'Vacation History'} handleClick={() => {}} />
        {/* Balance Strip */}
        {/* <View style={styles.balanceStrip}>
          <BalanceItem label="Available" value="18" accent={Colors.secondary} />
          <View style={styles.balanceDivider} />
          <BalanceItem label="Pending" value="3" accent={Colors.primary} />
          <View style={styles.balanceDivider} />
          <BalanceItem label="Used" value="9" accent={Colors.textMuted} />
        </View> */}

        {/* Leave Type */}
        {/* <View style={styles.section}>
          <SectionLabel text="Leave Type" required />
          <View style={styles.typeGrid}>
            {VACATION_TYPES.map(opt => (
              <VacationTypeCard
                key={opt.key}
                option={opt}
                selected={vacationType === opt.key}
                onPress={() => setVacationType(opt.key)}
              />
            ))}
          </View>
        </View> */}

        {/* Calendar */}
        <Calender
          startDate={startDate}
          endDate={endDate}
          resetDates={resetDates}
          selectingStart={selectingStart}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          workingDays={workingDays}
        />

        {/* Reason */}
        <View style={styles.section}>
          <SectionLabel text="Reason for Leave" required />
          <TextInput
            style={styles.textArea}
            placeholder="Describe your reason for taking leave..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{reason.length}/300</Text>
        </View>

        {/* Handover Notes */}
        <View style={styles.section}>
          <SectionLabel text="Handover Notes" />
          <TextInput
            style={[styles.textArea, styles.textAreaSmall]}
            placeholder="Who will cover your responsibilities? Any pending tasks?"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
            value={handover}
            onChangeText={setHandover}
            textAlignVertical="top"
          />
        </View>

        {/* Submit */}
        <FullButton canSubmit={canSubmit} handleSubmit={handleSubmit} />

        <Text style={styles.footerNote}>
          Your manager will be notified and respond within 2 business days.
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
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
    paddingTop: hp(2),
  },

  balanceStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    marginBottom: hp(3),
    alignItems: 'center',
  },

  balanceDivider: {
    width: 1,
    height: hp(4),
    backgroundColor: Colors.border,
  },

  section: {
    marginBottom: hp(3),
  },

  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2.5),
  },

  textArea: {
    backgroundColor: Colors.surface,
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(3.5),
    fontSize: wp(3.5),
    color: Colors.text,
    minHeight: hp(12.5),
    lineHeight: hp(2.75),
  },

  textAreaSmall: {
    minHeight: hp(10),
  },

  charCount: {
    fontSize: wp(2.75),
    color: Colors.textMuted,
    alignSelf: 'flex-end',
    marginTop: hp(0.5),
  },

  footerNote: {
    fontSize: wp(3),
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: hp(2.25),
  },
});

export default VacationRequestScreen;
