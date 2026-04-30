// components/InfoRow.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface InfoRowProps {
  label: string;
  value: string;
  accent?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, accent }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, accent ? { color: accent } : undefined]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  infoLabel: {
    fontSize: wp('3.25%'),
    color: Colors.textMuted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: wp('3.25%'),
    color: Colors.text,
    fontWeight: '700',
  },
});

export default InfoRow;
