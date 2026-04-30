import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
import { formatDuration, getNetWork } from '../../../../utiles/homeUtiles';
import { useEffect, useRef } from 'react';
import { Shift } from '../types';
import { ShiftTimeline } from './ShiftTimeline';

type Props = {
  shift: Shift;
  showChart?: boolean;
};
export const ShiftDetailCard = ({ shift, showChart = true }: Props) => {
  const slideAnim = useRef(new Animated.Value(hp('2.46%'))).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideAnim.setValue(hp('2.46%'));
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shift.date, slideAnim, fadeAnim]);

  const netWork = getNetWork(shift);
  const breakDuration = formatDuration(shift.breakStart, shift.breakEnd);
  const totalDuration = formatDuration(shift.start, shift.end);

  return (
    <Animated.View
      style={[
        sdStyles.card,
        showChart ? sdStyles.show : {},
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {showChart && (
        <>
          <View style={sdStyles.timelineSection}>
            <Text style={sdStyles.sectionLabel}>Your Shift</Text>
            <ShiftTimeline shift={shift} />
          </View>
          <View style={sdStyles.divider} />
        </>
      )}

      <View style={sdStyles.blocksRow}>
        <View style={[sdStyles.block, sdStyles.workBlock]}>
          <View style={sdStyles.blockDot} />
          <Text style={sdStyles.blockTitle}>Work</Text>
          <Text style={sdStyles.blockTime}>
            {shift.start} → {shift.breakStart}
          </Text>
          <Text style={sdStyles.blockDuration}>
            {formatDuration(shift.start, shift.breakStart)}
          </Text>
        </View>

        <View style={[sdStyles.block, sdStyles.breakBlock]}>
          <Text style={sdStyles.breakIcon}>☕</Text>
          <Text style={sdStyles.blockTitle}>Break</Text>
          <Text style={sdStyles.blockTime}>
            {shift.breakStart} → {shift.breakEnd}
          </Text>
          <Text style={[sdStyles.blockDuration, { color: Colors.textMuted }]}>
            {breakDuration}
          </Text>
        </View>

        <View style={[sdStyles.block, sdStyles.workBlock]}>
          <View style={sdStyles.blockDot} />
          <Text style={sdStyles.blockTitle}>Work</Text>
          <Text style={sdStyles.blockTime}>
            {shift.breakEnd} → {shift.end}
          </Text>
          <Text style={sdStyles.blockDuration}>
            {formatDuration(shift.breakEnd, shift.end)}
          </Text>
        </View>
      </View>

      <View style={sdStyles.divider} />

      <View style={sdStyles.summaryRow}>
        <View style={sdStyles.summaryItem}>
          <Text style={sdStyles.summaryLabel}>Total shift</Text>
          <Text style={sdStyles.summaryValue}>{totalDuration}</Text>
        </View>
        <View style={sdStyles.summaryItem}>
          <Text style={sdStyles.summaryLabel}>Break</Text>
          <Text style={[sdStyles.summaryValue, { color: Colors.textMuted }]}>
            {breakDuration}
          </Text>
        </View>
        <View style={sdStyles.summaryItem}>
          <Text style={sdStyles.summaryLabel}>Net work</Text>
          <Text style={[sdStyles.summaryValue, { color: Colors.primary }]}>
            {netWork}
          </Text>
        </View>
      </View>

      {shift.note && (
        <View style={sdStyles.noteBox}>
          <Text style={sdStyles.noteIcon}>📌</Text>
          <Text style={sdStyles.noteText}>{shift.note}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const sdStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: wp('5.33%'),
    marginHorizontal: wp('4.27%'),
    marginBottom: hp('1.48%'),
  },
  show: {
    paddingTop: hp('2.46%'),
    paddingBottom: hp('1.97%'),
    paddingHorizontal: wp('4.27%'),
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.49%') },
    shadowOpacity: 0.08,
    shadowRadius: wp('3.2%'),
    elevation: 3,
  },
  timelineSection: {
    marginBottom: hp('1.97%'),
  },
  sectionLabel: {
    fontSize: wp('2.93%'),
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: wp('0.32%'),
    marginBottom: hp('1.48%'),
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: hp('1.72%'),
  },
  blocksRow: {
    flexDirection: 'row',
    gap: wp('2.13%'),
  },
  block: {
    flex: 1,
    borderRadius: wp('3.2%'),
    padding: wp('2.67%'),
    alignItems: 'center',
    gap: hp('0.37%'),
  },
  workBlock: {
    backgroundColor: Colors.primary + '12',
    borderWidth: 1,
    borderColor: Colors.primary + '33',
  },
  breakBlock: {
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  blockDot: {
    width: wp('2.13%'),
    height: wp('2.13%'),
    borderRadius: wp('1.07%'),
    backgroundColor: Colors.primary,
    marginBottom: hp('0.25%'),
  },
  breakIcon: { fontSize: wp('3.73%'), marginBottom: hp('0.25%') },
  blockTitle: {
    fontSize: wp('2.67%'),
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: wp('0.16%'),
  },
  blockTime: {
    fontSize: wp('2.67%'),
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  blockDuration: {
    fontSize: wp('3.47%'),
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  summaryRow: {
    flexDirection: 'row',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: wp('2.93%'),
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: wp('0.19%'),
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: wp('4.53%'),
    fontWeight: '800',
    color: Colors.text,
    marginTop: hp('0.49%'),
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.primaryLight + '25',
    borderRadius: wp('2.67%'),
    padding: wp('2.67%'),
    gap: wp('2.13%'),
    marginTop: hp('1.72%'),
    borderWidth: 1,
    borderColor: Colors.primaryLight + '60',
  },
  noteIcon: { fontSize: wp('3.47%') },
  noteText: {
    flex: 1,
    fontSize: wp('3.47%'),
    color: Colors.textMuted,
    lineHeight: hp('2.22%'),
    fontStyle: 'italic',
  },
});
