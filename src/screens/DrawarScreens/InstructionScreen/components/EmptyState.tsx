import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

const EmptyState: React.FC = () => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyEmoji}>🔎</Text>
    <Text style={styles.emptyTitle}>No procedures found</Text>
    <Text style={styles.emptySub}>
      Try adjusting your filters or search term.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    paddingTop: hp(7.5), // 60px
    gap: hp(1), // 8px
  },
  emptyEmoji: { fontSize: wp(10) }, // 40px
  emptyTitle: {
    fontSize: wp(4.5), // 18px
    fontWeight: '700',
    color: Colors.text,
  },
  emptySub: {
    fontSize: wp(3.25), // 13px
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export default EmptyState;
