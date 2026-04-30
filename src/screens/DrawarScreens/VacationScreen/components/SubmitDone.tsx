import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { formatDate } from '../../../../utiles/vacationUtiles';
import { Colors, hp, wp } from '../../../../constants';
import { Row } from './Row';
import { VacationType } from '../types';

export default function SubmitDone({
  onEnd,
  workingDays,
  startDate,
  endDate,
  vacationType,
}: {
  onEnd: () => void;
  startDate: string | null;
  endDate: string | null;
  workingDays: number;
  vacationType: VacationType;
}) {
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <View style={styles.successContainer}>
        <Text style={styles.successTitle}>Request Submitted!</Text>
        <Text style={styles.successSub}>
          Your vacation request has been sent to your manager for approval.
        </Text>
        <View style={styles.successCard}>
          <Row label="Type" value={vacationType} />
          <Row label="From" value={formatDate(startDate!)} />
          <Row label="To" value={formatDate(endDate!)} />
          <Row
            label="Duration"
            value={`${workingDays} working day${workingDays > 1 ? 's' : ''}`}
          />
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={onEnd}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>New Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    width: wp('86%'),
    borderRadius: wp('4%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
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
    color: '#fff',
    letterSpacing: wp('0.075%'),
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('8%'),
    backgroundColor: Colors.bg,
  },
  successIcon: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: Colors.cardPhotoBackground,
    borderWidth: 2,
    borderColor: Colors.cardPhotoBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2.5%'),
  },
  successEmoji: {
    fontSize: wp('9%'),
  },
  successTitle: {
    fontSize: wp('6.5%'),
    fontWeight: '800',
    color: Colors.text,
    marginBottom: hp('1%'),
    letterSpacing: wp('-0.125%'),
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
    borderRadius: wp('4%'),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp('4%'),
    marginBottom: hp('3.5%'),
    gap: wp('3%'),
  },
});
