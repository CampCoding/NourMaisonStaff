import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../constants';

function DrawerItem({ item, isActive, onPress }) {
  const bg = isActive ? `rgba(221,153,51,0.09)` : 'transparent';
  const Icon = item.icon;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.item, { backgroundColor: bg }]}
    >
      {isActive && (
        <View style={[styles.activeBar, { backgroundColor: item.accent }]} />
      )}
      <View
        style={[styles.iconBadge, isActive && { borderColor: item.accent }]}
      >
        {/* { color: isActive ? item.accent : Colors.drawerMuted } */}
        <Icon
          height={wp(7)}
          width={wp(7)}
          fill={isActive ? item.accent : Colors.drawerMuted}
        />
      </View>
      <Text style={[styles.itemLabel, isActive && { color: item.accent }]}>
        {item.label}
      </Text>
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(3),
    marginVertical: hp(0.25),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    borderRadius: wp(2.5),
    position: 'relative',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: hp(1.25),
    bottom: hp(1.25),
    width: wp(0.75),
    borderRadius: wp(0.5),
  },
  iconBadge: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.25),
    borderWidth: 1,
    borderColor: Colors.drawerBorder,
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
    marginLeft: wp(1.5),
  },
  iconText: {
    fontSize: wp(4),
    lineHeight: hp(2.5),
  },
  itemLabel: {
    flex: 1,
    fontSize: wp(3.5),
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: wp(0.05),
  },
  activeDot: {
    width: wp(1.25),
    height: wp(1.25),
    borderRadius: wp(0.75),
    backgroundColor: Colors.primary,
    marginRight: wp(1),
    opacity: 0.9,
  },
});

export default DrawerItem;
