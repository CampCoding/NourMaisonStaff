import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TransferRecord } from '../types';
import { formatCurrency, typeConfig } from '../data';
// import { formatCurrency, statusConfig, typeConfig } from '../data';
import { Colors, hp, wp } from '../../../../constants';

interface TransferCardProps {
  item: TransferRecord;
  onPress: () => void;
}

export const TransferCard: React.FC<TransferCardProps> = ({
  item,
  onPress,
}) => {
  const type = typeConfig[item.type];
  // const status = statusConfig[item.status];
  const isAdvance = item.type === 'advance';

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <View style={[styles.cardAccent, { backgroundColor: type.color }]} />

      <View style={styles.cardInfo}>
        <View style={styles.topRow}>
          <Text style={styles.cardType}>{type.label}</Text>
        </View>

        {item.note ? (
          <Text style={styles.cardNote} numberOfLines={1}>
            {item.note}
          </Text>
        ) : null}

        <View style={styles.metaDivider} />

        <View style={styles.cardMeta}>
          <View style={styles.metaChip}>
            <Text style={styles.cardMetaText}>📅 {item.date}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.cardMetaText}>🕐 {item.time}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.cardMetaText}>🏦 {item.method}</Text>
          </View>
        </View>
      </View>

      <View style={styles.amountColumn}>
        <Text
          style={[
            styles.cardAmount,
            { color: isAdvance ? Colors.primaryDark : Colors.secondary },
          ]}
        >
          {isAdvance ? ' − ' : ' + '}
          {formatCurrency(item.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: wp(4),
    marginBottom: hp(1.5),
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    paddingVertical: hp(1.75),
    paddingRight: wp(4),
    paddingLeft: wp(1),
    gap: wp(3),
    shadowColor: '#2c2218',
    shadowOffset: { width: 0, height: hp(0.3) },
    shadowOpacity: 0.07,
    shadowRadius: wp(2.5),
    elevation: 3,
  },

  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: wp(1.2),
    borderTopLeftRadius: wp(4),
    borderBottomLeftRadius: wp(4),
  },

  cardInfo: {
    flex: 1,
    gap: hp(0.5),
    paddingLeft: wp(4),
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },

  cardType: {
    fontSize: hp(2),
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },

  cardNote: {
    fontSize: hp(1.7),
    color: Colors.textMuted,
    fontWeight: '400',
  },

  metaDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: hp(0.4),
  },

  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flexWrap: 'wrap',
  },

  metaChip: {
    backgroundColor: Colors.surface2,
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
  },

  cardMetaText: {
    fontSize: hp(1.55),
    color: Colors.textMuted,
    fontWeight: '500',
  },

  amountColumn: {
    alignItems: 'flex-end',
    gap: hp(0.1),
    minWidth: wp(22),
  },

  cardAmount: {
    fontSize: hp(1.9),
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'right',
  },
});
