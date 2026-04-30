import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AdvanceReason } from '../types';
import { Colors, hp, Icons, wp } from '../../../../constants';

interface ReasonOption {
  key: AdvanceReason;
  icon: string;
  label: string;
}

interface ReasonSelectorProps {
  options: ReasonOption[];
  selectedReason: AdvanceReason | null;
  onSelectReason: (key: AdvanceReason) => void;
}

const ReasonSelector: React.FC<ReasonSelectorProps> = ({
  options,
  selectedReason,
  onSelectReason,
}) => (
  <View style={styles.reasonGrid}>
    {options.map(opt => {
      const selected = selectedReason === opt.key;
      const Icon = Icons[opt.icon as keyof typeof Icons];
      return (
        <TouchableOpacity
          key={opt.key}
          style={[styles.reasonCard, selected && styles.reasonCardSelected]}
          onPress={() => onSelectReason(opt.key)}
          activeOpacity={0.75}
        >
          <Icon
            height={wp('8%')}
            width={wp('8%')}
            fill={selected ? Colors.primaryDark : Colors.textMuted}
          />
          {/* <Text style={styles.reasonIcon}>{opt.icon}</Text> */}
          <Text
            style={[styles.reasonLabel, selected && styles.reasonLabelSelected]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  reasonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: wp('2.5%'),
  },
  reasonCard: {
    width: '30.5%',
    backgroundColor: Colors.surface,
    borderRadius: wp('3.5%'),
    paddingVertical: hp('1.75%'),
    alignItems: 'center',
    borderWidth: hp('0.18%'),
    borderColor: Colors.border,
  },
  reasonCardSelected: {
    backgroundColor: '#fff8ec',
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp('0.37%') },
    shadowOpacity: 0.15,
    shadowRadius: wp('1.5%'),
    elevation: 3,
  },
  reasonIcon: { fontSize: wp('5.5%'), marginBottom: hp('0.75%') },
  reasonLabel: {
    fontSize: wp('2.75%'),
    fontWeight: '600',
    color: Colors.textMuted,
  },
  reasonLabelSelected: {
    color: Colors.primaryDark,
  },
});

export default ReasonSelector;
