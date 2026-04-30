import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface MonthSectionHeaderProps {
  title: string;
}

export const MonthSectionHeader: React.FC<MonthSectionHeaderProps> = ({
  title,
}) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionDot} />
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionLine} />
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(2.5),
    marginBottom: hp(1.25),
    gap: wp(2),
  },
  sectionDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  sectionLine: {
    flex: 1,
    height: hp(0.125),
    backgroundColor: Colors.border,
  },
});
