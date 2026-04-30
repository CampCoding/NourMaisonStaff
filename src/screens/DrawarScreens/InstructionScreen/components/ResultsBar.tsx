import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface Props {
  count: number;
  onClearFilters: () => void;
  showClearButton: boolean;
}

const ResultsBar: React.FC<Props> = ({
  count,
  onClearFilters,
  showClearButton,
}) => (
  <View style={styles.resultsBar}>
    <Text style={styles.resultsText}>
      {count} procedure{count !== 1 ? 's' : ''} found
    </Text>
    {showClearButton && (
      <TouchableOpacity onPress={onClearFilters}>
        <Text style={styles.clearFilters}>Clear filters</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5), // 20px
    paddingVertical: hp(1), // 8px
  },
  resultsText: {
    fontSize: wp(3), // 12px
    color: Colors.textMuted,
    fontWeight: '500',
  },
  clearFilters: {
    fontSize: wp(3), // 12px
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default ResultsBar;
