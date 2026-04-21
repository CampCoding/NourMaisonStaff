import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, hp, Icons, wp } from '../../constants';

function DrawerFooter({ navigation }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerDivider} />
      <TouchableOpacity style={styles.footerBtn} activeOpacity={0.7}>
        <Icons.Logout height={wp(5)} width={wp(5)} color={Colors.drawerMuted} />
        <Text style={styles.footerLabel}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(2.5),
  },
  footerDivider: {
    height: 1,
    backgroundColor: Colors.drawerBorder,
    marginBottom: hp(1.75),
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.25),
    paddingHorizontal: wp(3.5),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: 'rgba(221,153,51,0.15)',
    backgroundColor: 'rgba(221,153,51,0.05)',
    marginBottom: hp(1.75),
  },
  footerIcon: {
    fontSize: wp(4),
    color: Colors.primaryDark,
    marginRight: wp(3),
  },
  footerLabel: {
    fontSize: wp(3.25),
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: wp(0.075),
  },
  footerVersion: {
    fontSize: wp(2.5),
    color: Colors.textMuted,
    textAlign: 'center',
    letterSpacing: wp(0.25),
  },
});
export default DrawerFooter;
