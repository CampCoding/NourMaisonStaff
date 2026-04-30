import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, hp, wp } from '../constants';

export default function FullButton({
  canSubmit,
  handleSubmit,
}: {
  canSubmit: boolean | '' | null;
  handleSubmit: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
      onPress={handleSubmit}
      disabled={!canSubmit}
      activeOpacity={0.85}
    >
      <Text style={styles.submitBtnText}>Submit Request</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    letterSpacing: wp('0.075%'),
  },
});
