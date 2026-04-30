import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VacationTypeOption } from '../types';
import { Colors, hp, Icons, wp } from '../../../../constants';

export const VacationTypeCard: React.FC<{
  option: VacationTypeOption;
  selected: boolean;
  onPress: () => void;
}> = ({ option, selected, onPress }) => {
  const Icon = Icons[option.icon as keyof typeof Icons];

  return (
    <TouchableOpacity
      style={[
        styles.typeCard,
        {
          backgroundColor: option.bg,
          borderColor: selected ? option.color : 'transparent',
        },
        selected && styles.typeCardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Icon
        height={wp('8%')}
        width={wp('8%')}
        fill={selected ? option.color : Colors.textMuted}
      />
      <Text
        style={[
          styles.typeLabel,
          { color: selected ? option.color : Colors.textMuted },
        ]}
      >
        {option.label}
      </Text>
      {selected && (
        <View style={[styles.typeCheck, { backgroundColor: option.color }]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  typeCard: {
    width: '47.5%',
    borderRadius: wp('3.5%'),
    padding: wp('3.5%'),
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  typeCardSelected: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.18,
    shadowRadius: wp('2%'),
    elevation: 4,
  },
  typeIcon: {
    fontSize: wp('6%'),
    marginBottom: hp('0.75%'),
  },
  typeLabel: {
    fontSize: wp('3.25%'),
    fontWeight: '600',
  },
  typeCheck: {
    position: 'absolute',
    top: wp('2.5%'),
    right: wp('2.5%'),
    width: wp('4.5%'),
    height: wp('4.5%'),
    borderRadius: wp('2.25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
