import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SectionLabel } from './SectionLabel';
import CalendarComponent from '../../../../component/Calender';
import { DaySummaryPill } from './DaySummaryPill';
import { formatDate } from '../../../../utiles/vacationUtiles';
import { Colors, hp, wp } from '../../../../constants';
import { StepChip } from './StepChip';

export default function Calender({
  startDate,
  endDate,
  resetDates,
  selectingStart,
  setStartDate,
  setEndDate,
  workingDays,
}: {
  startDate: string | null;
  endDate: string | null;
  resetDates: () => void;
  selectingStart: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  workingDays: number;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.calendarHeaderRow}>
        <SectionLabel text="Select Dates" required />
        {(startDate || endDate) && (
          <TouchableOpacity onPress={resetDates}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Step indicator */}
      <View style={styles.stepRow}>
        <StepChip
          active={selectingStart && !startDate}
          done={!!startDate}
          label={startDate ? formatDate(startDate) : 'Start Date'}
          icon="📅"
        />
        <View style={styles.stepArrow}>
          <Text style={styles.stepArrowText}>→</Text>
        </View>
        <StepChip
          active={!selectingStart}
          done={!!endDate}
          label={endDate ? formatDate(endDate) : 'End Date'}
          icon="📅"
        />
      </View>

      <CalendarComponent
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {workingDays > 0 && <DaySummaryPill count={workingDays} />}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: hp('3%'),
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1.25%'),
  },
  resetText: {
    fontSize: wp('3.25%'),
    color: Colors.primary,
    fontWeight: '600',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
    gap: wp('1.5%'),
  },
  stepArrow: {
    paddingHorizontal: wp('0.5%'),
  },
  stepArrowText: {
    color: Colors.textMuted,
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
});
