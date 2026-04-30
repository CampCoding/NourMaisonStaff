import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, wp, hp } from '../../../../constants';
import { CategoryPillProps } from '../types';

const CategoryPill: React.FC<CategoryPillProps> = ({
  item,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.pill, selected && styles.pillActive]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <Text style={[styles.pillText, selected && styles.pillTextActive]}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: Colors.textMuted,
  },
  pillTextActive: {
    color: Colors.surface,
  },
});

export default CategoryPill;
