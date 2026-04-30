import { View, StyleSheet, Pressable, StatusBar } from 'react-native';
import React from 'react';
import { Colors, hp, Icons, wp } from '../constants';
import { CustomText } from './CustomText';
import { useNavigation } from '@react-navigation/native';

export default function PagesHeader({
  name,
  subName,
}: {
  name: string;
  subName: string;
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      <View style={styles.headerCenter}>
        <CustomText style={styles.headerTitle}>{name}</CustomText>
        <CustomText style={styles.headerSub}>{subName}</CustomText>
      </View>
      <Pressable
        style={styles.roleBadge}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Icons.Bars color={Colors.secondaryDark} height={hp(4)} width={hp(4)} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.75),
    backgroundColor: Colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  roleBadge: {
    backgroundColor: Colors.secondary + '22',
    borderRadius: wp('5.33%'),
    paddingHorizontal: wp('3.2%'),
    paddingVertical: hp('0.62%'),
    borderWidth: 1,
    borderColor: Colors.secondary + '44',
  },
  headerCenter: {
    flex: 1,
    marginLeft: wp(3.5),
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: wp(-0.075),
  },
  headerSub: {
    fontSize: wp(3.5),
    color: Colors.textMuted,
    marginTop: hp(0.125),
  },
  headerBadge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    backgroundColor: Colors.surface2,
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerBadgeText: {
    fontSize: wp(3),
    fontWeight: '700',
    color: Colors.primaryDark,
  },
});
