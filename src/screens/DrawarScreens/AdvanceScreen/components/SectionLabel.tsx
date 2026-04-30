import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface SectionLabelProps {
  text: string;
  required?: boolean;
  note?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({
  text,
  required,
  note,
}) => (
  <View style={styles.sectionLabelRow}>
    <Text style={styles.sectionLabel}>{text}</Text>
    {required && <Text style={styles.requiredDot}>*</Text>}
    {note ? <Text style={styles.sectionNote}>{note}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  sectionLabel: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 0.1,
  },
  requiredDot: {
    fontSize: wp('4%'),
    color: Colors.primary,
    marginLeft: wp('0.75%'),
    fontWeight: '700',
    lineHeight: hp('2.5%'),
  },
  sectionNote: {
    fontSize: wp('3%'),
    color: '#e06b6b',
    marginLeft: wp('1.5%'),
    fontWeight: '600',
  },
});

export default SectionLabel;
