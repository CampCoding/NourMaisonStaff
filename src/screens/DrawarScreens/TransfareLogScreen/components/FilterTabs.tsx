import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterTab } from '../types';
import { Colors, hp, wp } from '../../../../constants';

interface FilterTabsProps {
  active: FilterTab;
  onChange: (f: FilterTab) => void;
  counts: Record<FilterTab, number>;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  active,
  onChange,
  counts,
}) => {
  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'salary', label: 'Salary' },
    { key: 'advance', label: 'Advance' },
  ];

  return (
    <View style={styles.tabsWrapper}>
      {tabs.map(tab => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.75}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
            <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
              <Text
                style={[
                  styles.tabBadgeText,
                  isActive && styles.tabBadgeTextActive,
                ]}
              >
                {counts[tab.key]}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    marginVertical: hp(1.5),
    backgroundColor: Colors.surface2,
    borderRadius: wp(3),
    padding: wp(1),
    borderWidth: wp(0.25),
    borderColor: Colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    borderRadius: wp(2.25),
    gap: wp(1.5),
  },
  tabActive: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: hp(0.125) },
    shadowOpacity: 0.08,
    shadowRadius: wp(1),
    elevation: 2,
  },
  tabText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  tabBadge: {
    backgroundColor: Colors.gray2,
    borderRadius: wp(2.5),
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.125),
  },
  tabBadgeActive: {
    backgroundColor: Colors.primaryLight,
  },
  tabBadgeText: {
    fontSize: wp(3),
    fontWeight: '600',
    color: Colors.textMuted,
  },
  tabBadgeTextActive: {
    color: Colors.primaryDark,
  },
});
