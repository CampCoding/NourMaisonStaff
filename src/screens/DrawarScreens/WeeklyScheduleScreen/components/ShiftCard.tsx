// components/ShiftCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { ShiftData } from '../types';
import { DateBadge } from './DateBadge';
import { ShiftStatus } from './ShiftStatus';
import { TotalPill } from './TotalPill';
import { TimeBlock } from './TimeBlock';
import {
  calcDuration,
  calcWorkDuration,
  formatDate,
  getDayState,
} from '../utiles';
import { Colors, hp, wp } from '../../../../constants';
import { Shift } from '../../HomeScreen/types';
import { ShiftDetailCard } from '../../HomeScreen/components/ShiftDetailCard';

interface ShiftCardProps {
  shift: Shift;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
  const state = getDayState(shift.date);
  const { weekday, weekdayLong, day, month } = formatDate(shift.date);
  const workDur = calcWorkDuration(shift);
  const breakDur = calcDuration(shift.breakStart, shift.breakEnd);
  const totalDur = calcDuration(shift.start, shift.end);

  const isPast = state === 'past';
  const isToday = state === 'today';

  return (
    <View
      style={[
        styles.card,
        isPast && styles.cardPast,
        isToday && styles.cardToday,
      ]}
    >
      {isToday && (
        <View style={styles.todayRibbon}>
          <Text style={styles.todayRibbonText}>TODAY</Text>
        </View>
      )}

      <View style={styles.cardHeader}>
        <DateBadge
          weekday={weekday}
          day={day}
          month={month}
          isPast={isPast}
          isToday={isToday}
        />
        <ShiftStatus
          isPast={isPast}
          isToday={isToday}
          weekdayLong={weekdayLong}
        />
        <TotalPill totalDur={totalDur} isPast={isPast} />
      </View>

      {!isToday && (
        <View
          style={[styles.divider, isPast && { backgroundColor: Colors.gray3 }]}
        />
      )}

      {!isToday ? (
        <View style={[styles.timeBlocks, isPast && { opacity: 0.55 }]}>
          <TimeBlock
            label="WORK HOURS"
            start={shift.start}
            end={shift.end}
            duration={workDur}
            icon="⏱"
            color={Colors.secondary}
            isPast={isPast}
          />
          <View
            style={[
              styles.blockSep,
              isPast && { backgroundColor: Colors.gray3 },
            ]}
          />
          <TimeBlock
            label="BREAK"
            start={shift.breakStart}
            end={shift.breakEnd}
            duration={breakDur}
            icon="☕"
            color={Colors.primary}
            isPast={isPast}
          />
        </View>
      ) : (
        <>
          <ShiftDetailCard shift={shift} showChart={false} />
          <View style={styles.todayFooter}>
            <Text style={styles.todayFooterText}>
              Everything rush, Full team in floor.
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: wp(5),
    marginBottom: hp(1.5),
    borderWidth: wp(0.25),
    borderColor: Colors.border,
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.06,
    shadowRadius: wp(2),
    elevation: 3,
  },
  cardPast: {
    backgroundColor: '#f7f6f4',
    borderColor: Colors.gray3,
    shadowOpacity: 0.02,
    elevation: 1,
  },
  cardToday: {
    borderColor: Colors.primary,
    borderWidth: wp(0.5),
    shadowColor: Colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: wp(3),
    elevation: 6,
  },
  todayRibbon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.625),
    zIndex: 10,
  },
  todayRibbonText: {
    fontSize: wp(2.5),
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: wp(0.375),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    paddingBottom: hp(1.5),
    gap: wp(3),
  },
  divider: {
    height: hp(0.125),
    backgroundColor: Colors.border,
    marginHorizontal: wp(4),
  },
  timeBlocks: {
    flexDirection: 'row',
    padding: wp(3.5),
  },
  blockSep: {
    width: wp(0.25),
    backgroundColor: Colors.border,
    marginVertical: hp(0.5),
  },
  todayFooter: {
    backgroundColor: Colors.surface2,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderTopWidth: wp(0.25),
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  todayFooterText: {
    fontSize: wp(3),
    fontWeight: '600',
    color: Colors.primaryDark,
    letterSpacing: wp(0.075),
  },
});
