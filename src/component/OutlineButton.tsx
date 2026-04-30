import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, hp, wp } from '../constants';

export default function OutlineButton({
  handleClick,
  name,
}: {
  handleClick: () => void;
  name: string;
}) {
  return (
    <TouchableOpacity
      style={[styles.submitBtn]}
      onPress={handleClick}
      disabled={!handleClick}
      activeOpacity={0.85}
    >
      <Text style={styles.submitBtnText}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: Colors.bg,
    borderRadius: wp('4%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp('0.75%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('3%'),
    elevation: 6,
    marginBottom: hp('1.5%'),
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  submitBtnText: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: wp('0.075%'),
  },
});
