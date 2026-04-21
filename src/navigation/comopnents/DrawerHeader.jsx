import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../constants';

function DrawerHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerGrain} />
      <View style={styles.accentLineH} />
      <View style={styles.accentLineV} />
      <View style={styles.accentCorner} />
      <View style={styles.avatarRing}>
        <View style={styles.avatarInner}>
          <Text style={styles.avatarInitial}>A</Text>
        </View>
      </View>
      <Text style={styles.headerName}>Alex Morgan</Text>
      <Text style={styles.headerRole}>Premium Member</Text>
      <View style={styles.headerDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: hp(7),
    paddingBottom: hp(2.5),
    paddingHorizontal: wp(6),
    borderBottomWidth: 1,
    borderBottomColor: Colors.drawerBorder,
    overflow: 'hidden',
    position: 'relative',
  },
  headerGrain: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.04,
  },
  accentLineH: {
    position: 'absolute',
    top: hp(4.5),
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.drawerBorder,
  },
  accentLineV: {
    position: 'absolute',
    top: 0,
    right: wp(15),
    width: 1,
    height: hp(15),
    backgroundColor: Colors.drawerBorder,
  },
  accentCorner: {
    position: 'absolute',
    top: hp(1.5),
    right: wp(3),
    width: wp(7),
    height: wp(7),
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: `rgba(221,153,51,0.25)`,
    borderRadius: wp(0.75),
  },
  avatarRing: {
    width: wp(17),
    height: wp(17),
    borderRadius: wp(8.5),
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.5),
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: hp(1.25),
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  avatarInner: {
    width: wp(14.5),
    height: wp(14.5),
    borderRadius: wp(7.25),
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: `rgba(221,153,51,0.2)`,
  },
  avatarInitial: {
    fontSize: wp(6.5),
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: wp(0.25),
  },
  headerName: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: wp(0.125),
    marginBottom: hp(0.375),
  },
  headerRole: {
    fontSize: wp(3),
    fontWeight: '500',
    color: Colors.textMuted,
    letterSpacing: wp(0.375),
    textTransform: 'uppercase',
    marginBottom: hp(2),
  },
  headerDivider: {
    height: 1,
    backgroundColor: Colors.primary,
    width: wp(10),
    opacity: 0.5,
    borderRadius: 1,
  },
});

export default DrawerHeader;
