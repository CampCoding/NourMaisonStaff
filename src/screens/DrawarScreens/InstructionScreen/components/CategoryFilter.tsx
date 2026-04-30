import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
import { CategoryKey } from '../types';
import { CATEGORIES } from '../data';

interface Props {
  selectedCategory: CategoryKey | null;
  onSelectCategory: (category: CategoryKey | null) => void;
}

const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.catScroll}
    contentContainerStyle={styles.catScrollContent}
  >
    <TouchableOpacity
      style={[styles.catChip, !selectedCategory && styles.catChipActive]}
      onPress={() => onSelectCategory(null)}
      activeOpacity={0.75}
    >
      <Text
        style={[
          styles.catChipText,
          !selectedCategory && styles.catChipTextActive,
        ]}
      >
        All
      </Text>
    </TouchableOpacity>
    {CATEGORIES.map(cat => {
      const active = selectedCategory === cat.key;
      return (
        <TouchableOpacity
          key={cat.key}
          style={[styles.catChip, active && styles.catChipActive]}
          onPress={() => onSelectCategory(active ? null : cat.key)}
          activeOpacity={0.75}
        >
          <Text
            style={[styles.catChipText, active && styles.catChipTextActive]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  catScroll: { maxHeight: hp(5.5) }, // 44px
  catScrollContent: {
    paddingHorizontal: wp(5), // 20px
    paddingBottom: hp(1), // 8px
    gap: wp(2), // 8px
    flexDirection: 'row',
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1), // 4px
    paddingHorizontal: wp(3), // 12px
    paddingVertical: hp(0.625), // 5px
    borderRadius: wp(2.5), // 10px
    backgroundColor: Colors.gray3,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  catChipActive: {
    backgroundColor: '#fff8ec',
    borderColor: Colors.primary,
  },
  catChipText: {
    fontSize: wp(3), // 12px
    fontWeight: '600',
    color: Colors.textMuted,
  },
  catChipTextActive: { color: Colors.primaryDark },
});

export default CategoryFilter;
