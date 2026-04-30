import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SOPItem } from '../types';
import RoleTag from './RoleTag';
import { Colors, hp, wp } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../../../navigation/ScreenNames';
import { NavigationProp } from '../../../../navigation/type';

interface Props {
  item: SOPItem;
}

const SOPCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<NavigationProp>();
  const onPress = useCallback(() => {
    navigation.navigate(ScreenNames.InstructionDetailScreen, {
      activeItem: item,
    });
  }, [navigation, item]);
  return (
    <TouchableOpacity
      style={styles.sopCard}
      onPress={onPress}
      activeOpacity={0.78}
    >
      <View style={styles.sopCardTop}>
        <View style={styles.sopCardMeta}>
          <Text style={styles.sopCardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.sopStepCount}>{item.steps.length} steps</Text>
        </View>
      </View>
      <View style={styles.sopRoleTags}>
        {item.roles
          .filter(r => r !== 'all')
          .map(r => (
            <RoleTag key={r} roleKey={r} />
          ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sopCard: {
    backgroundColor: Colors.surface,
    borderRadius: wp(4), // 16px
    padding: wp(4), // 16px
    // borderWidth: 1,
    // borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: hp(0.25) }, // 2px
    shadowOpacity: 0.5,
    shadowRadius: wp(1.5), // 6px
    elevation: 2,
  },
  sopCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3), // 12px
    marginBottom: hp(1.25), // 10px
  },
  sopCardMeta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sopCardTitle: {
    fontSize: wp(3.75), // 15px
    fontWeight: '700',
    color: Colors.text,
    marginBottom: hp(0.625), // 5px
    letterSpacing: -0.2,
  },
  sopRoleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(1.5), // 6px
    marginBottom: hp(0.75), // 6px
  },
  sopStepCount: {
    fontSize: wp(2.75), // 11px
    color: Colors.textMuted,
    fontWeight: '500',
  },
});

export default SOPCard;
