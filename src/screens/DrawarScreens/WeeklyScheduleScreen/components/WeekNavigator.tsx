// components/WeekNavigator.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getMondayOf, weekRangeLabel } from '../utiles';
import { Colors, hp, Icons, wp } from '../../../../constants';

interface WeekNavigatorProps {
  monday: Date;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
}

export const WeekNavigator: React.FC<WeekNavigatorProps> = ({
  monday,
  onPrev,
  onNext,
  canGoPrev,
}) => {
  const todayMon = getMondayOf(new Date());
  const weekOffset = Math.round(
    (monday.getTime() - todayMon.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );

  let weekLabel = '';
  if (weekOffset === 0) weekLabel = 'This Week';
  else if (weekOffset === 1) weekLabel = 'Next Week';
  else if (weekOffset === -1) weekLabel = 'Last Week';
  else if (weekOffset > 1) weekLabel = `${weekOffset} weeks ahead`;
  else weekLabel = `${Math.abs(weekOffset)} weeks ago`;

  return (
    <View style={styles.weekNav}>
      <TouchableOpacity
        style={[styles.navBtn, !canGoPrev && styles.navBtnDisabled]}
        onPress={onPrev}
        disabled={!canGoPrev}
        activeOpacity={0.7}
      >
        <Icons.LeftArrow height={wp(5)} width={wp(5)} color={Colors.primary} />
      </TouchableOpacity>

      <View style={styles.navCenter}>
        <Text style={styles.navWeekLabel}>{weekLabel}</Text>
        <Text style={styles.navRange}>{weekRangeLabel(monday)}</Text>
      </View>

      <TouchableOpacity
        style={styles.navBtn}
        onPress={onNext}
        activeOpacity={0.7}
      >
        <Icons.RightArrow height={wp(5)} width={wp(5)} color={Colors.primary} />{' '}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  weekNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
    backgroundColor: Colors.surface,
    borderRadius: wp(4),
    borderWidth: wp(0.25),
    borderColor: Colors.border,
    paddingVertical: hp(1.25),
    paddingHorizontal: wp(2),
    marginTop: hp(2),
  },
  navBtn: {
    width: wp(9.5),
    height: wp(9.5),
    backgroundColor: Colors.surface2,
    borderRadius: wp(2.5),
    borderWidth: wp(0.25),
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnDisabled: { opacity: 0.3 },
  navBtnIcon: {
    fontSize: wp(5.5),
    fontWeight: '700',
    color: Colors.primaryDark,
    lineHeight: hp(3.25),
  },
  navCenter: { flex: 1, alignItems: 'center' },
  navWeekLabel: { fontSize: wp(4.5), fontWeight: '700', color: Colors.text },
  navRange: {
    fontSize: wp(2.8),
    color: Colors.textMuted,
    fontWeight: '500',
    marginTop: hp(0.125),
  },
});
