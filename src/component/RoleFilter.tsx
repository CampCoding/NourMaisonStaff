import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RoleKey } from '../screens/DrawarScreens/InstructionScreen/types';
import { Colors, hp, wp } from '../constants';
import { ROLES } from '../screens/DrawarScreens/InstructionScreen/data';

interface Props {
  selectedRole: RoleKey;
  onSelectRole: (role: RoleKey) => void;
  Roles: { key: RoleKey; label: string }[];
}

const RoleFilter: React.FC<Props> = ({
  selectedRole,
  onSelectRole,
  Roles = ROLES,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.roleScroll}
    contentContainerStyle={styles.roleScrollContent}
  >
    {Roles.map(role => {
      const active = selectedRole === role.key;
      return (
        <TouchableOpacity
          key={role.key}
          style={[
            styles.roleChip,
            active && {
              backgroundColor: Colors.primary,
              borderColor: Colors.primary,
            },
          ]}
          onPress={() => onSelectRole(role.key)}
          activeOpacity={0.75}
        >
          <Text
            style={[styles.roleChipText, active && styles.roleChipTextActive]}
          >
            {role.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  roleScroll: { maxHeight: hp(6) }, // 48px
  roleScrollContent: {
    paddingHorizontal: wp(5), // 20px
    paddingVertical: hp(1), // 8px
    gap: wp(2), // 8px
    flexDirection: 'row',
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.25), // 5px
    paddingHorizontal: wp(3.5), // 14px
    paddingVertical: hp(0.875), // 7px
    borderRadius: wp(5), // 20px
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  roleChipText: {
    fontSize: wp(3), // 12px
    fontWeight: '600',
    color: Colors.textMuted,
  },
  roleChipTextActive: { color: Colors.white },
});

export default RoleFilter;
