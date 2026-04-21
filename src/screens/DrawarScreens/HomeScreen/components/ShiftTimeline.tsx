import { StyleSheet, Text, View } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
import { Shift } from '../types';
import { timeToMinutes } from '../../../../utiles/homeUtiles';

const HOUR_START = 6;
const HOUR_END = 24;
const TOTAL_MINS = (HOUR_END - HOUR_START) * 60;

export const ShiftTimeline = ({ shift }: { shift: Shift }) => {
  const barWidth = wp('84%');

  const toX = (time: string) => {
    const mins = timeToMinutes(time) - HOUR_START * 60;
    return (mins / TOTAL_MINS) * barWidth;
  };

  const workStart1X = toX(shift.start);
  const breakStartX = toX(shift.breakStart);
  const breakEndX = toX(shift.breakEnd);
  const workEnd2X = toX(shift.end);

  const seg1W = breakStartX - workStart1X;
  const breakW = breakEndX - breakStartX;
  const seg2W = workEnd2X - breakEndX;

  const ticks = [6, 9, 12, 15, 18, 21, 24];

  return (
    <View style={tlStyles.wrapper}>
      <View style={[tlStyles.tickRow, { width: barWidth }]}>
        {ticks.map(h => (
          <Text
            key={h}
            style={[
              tlStyles.tickLabel,
              {
                left:
                  ((h - HOUR_START) / (HOUR_END - HOUR_START)) * barWidth -
                  wp('2.13%'),
              },
            ]}
          >
            {String(h).padStart(2, '0')}
          </Text>
        ))}
      </View>

      <View style={[tlStyles.track, { width: barWidth }]}>
        {ticks.map(h => (
          <View
            key={h}
            style={[
              tlStyles.tickLine,
              { left: ((h - HOUR_START) / (HOUR_END - HOUR_START)) * barWidth },
            ]}
          />
        ))}

        <View
          style={[
            tlStyles.seg,
            tlStyles.workSeg,
            { left: workStart1X, width: seg1W },
          ]}
        />

        <View
          style={[
            tlStyles.seg,
            tlStyles.breakSeg,
            { left: breakStartX, width: breakW },
          ]}
        />

        <View
          style={[
            tlStyles.seg,
            tlStyles.workSeg,
            { left: breakEndX, width: seg2W },
          ]}
        />

        <View
          style={[tlStyles.pin, tlStyles.pinStart, { left: workStart1X }]}
        />
        <View
          style={[
            tlStyles.pin,
            tlStyles.pinEnd,
            { left: workEnd2X - wp('1.07%') },
          ]}
        />
      </View>

      <View style={[tlStyles.timeLabelRow, { width: barWidth }]}>
        <Text style={[tlStyles.timeLabel, { left: workStart1X }]}>
          {shift.start}
        </Text>
        <Text
          style={[
            tlStyles.timeLabel,
            tlStyles.breakLabel,
            { left: breakStartX - wp('2.13%') },
          ]}
        >
          ☕ {shift.breakStart}
        </Text>
        <Text
          style={[
            tlStyles.timeLabel,
            tlStyles.endLabel,
            { left: workEnd2X - wp('8%') },
          ]}
        >
          {shift.end}
        </Text>
      </View>
    </View>
  );
};

const tlStyles = StyleSheet.create({
  wrapper: {
    marginTop: hp('0.49%'),
    marginBottom: hp('0.98%'),
  },
  tickRow: {
    height: hp('1.97%'),
    position: 'relative',
    marginBottom: hp('0.49%'),
  },
  tickLabel: {
    position: 'absolute',
    fontSize: wp('2.4%'),
    color: Colors.textMuted,
    fontWeight: '500',
  },
  track: {
    height: hp('2.22%'),
    backgroundColor: Colors.surface2,
    borderRadius: wp('2.4%'),
    overflow: 'visible',
    position: 'relative',
  },
  tickLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: wp('0.27%'),
    backgroundColor: Colors.border,
  },
  seg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: wp('1.6%'),
  },
  workSeg: {
    backgroundColor: Colors.primary,
  },
  breakSeg: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    borderStyle: 'dashed',
  },
  pin: {
    position: 'absolute',
    top: hp('0.37%'),
    width: wp('1.07%'),
    height: hp('1.48%'),
    borderRadius: wp('0.53%'),
  },
  pinStart: {
    backgroundColor: Colors.primaryDark,
  },
  pinEnd: {
    backgroundColor: Colors.primaryDark,
  },
  timeLabelRow: {
    height: hp('2.22%'),
    position: 'relative',
    marginTop: hp('0.49%'),
  },
  timeLabel: {
    position: 'absolute',
    fontSize: wp('2.67%'),
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  breakLabel: {
    color: Colors.textMuted,
    fontWeight: '500',
  },
  endLabel: {
    color: Colors.primaryDark,
  },
});
