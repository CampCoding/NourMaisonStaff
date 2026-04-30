import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoleKey } from '../types';
import { ROLES } from '../data';
import { Colors, hp, wp } from '../../../../constants';

interface Props {
  roleKey: RoleKey;
}

const RoleTag: React.FC<Props> = ({ roleKey }) => {
  const role = ROLES.find(r => r.key === roleKey);
  if (!role || roleKey === 'all') return null;

  return (
    <View style={[styles.roleTag, { backgroundColor: Colors.primary + '18' }]}>
      <Text style={[styles.roleTagText, { color: Colors.primary }]}>
        {role.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  roleTag: {
    paddingHorizontal: wp(2.25),
    paddingVertical: hp(0.375),
    borderRadius: wp(2),
  },
  roleTagText: {
    fontSize: wp(2.75),
    fontWeight: '600',
  },
});

export default RoleTag;
