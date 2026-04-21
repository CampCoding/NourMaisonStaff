import { View, Text, Platform, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Colors, hp, wp } from '../../../../constants';
import { Icons } from './../../../../constants/Icons';
import { useNavigation } from '@react-navigation/native';
const CURRENT_USER = {
  name: 'Ahmed Nour',
  role: 'Waiter',
  avatar: 'AN',
};

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>{CURRENT_USER.avatar}</Text>
        </View>
        <View>
          <Text style={styles.greeting}>Good day,</Text>
          <Text style={styles.userName}>{CURRENT_USER.name}</Text>
        </View>
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
  safe: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.bg,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: wp('3.2%') },
  userAvatar: {
    width: wp('11.73%'),
    height: wp('11.73%'),
    borderRadius: wp('5.87%'),
    backgroundColor: Colors.primary + '22',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: wp('4%'),
    fontWeight: '800',
    color: Colors.primary,
  },
  greeting: {
    fontSize: wp('2.93%'),
    color: Colors.textMuted,
    fontWeight: '500',
  },
  userName: {
    fontSize: wp('4.53%'),
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  roleBadge: {
    backgroundColor: Colors.secondary + '22',
    borderRadius: wp('5.33%'),
    paddingHorizontal: wp('3.2%'),
    paddingVertical: hp('0.62%'),
    borderWidth: 1,
    borderColor: Colors.secondary + '44',
  },
  roleText: {
    fontSize: wp('3.47%'),
    fontWeight: '700',
    color: Colors.secondaryDark,
  },

  scroll: { paddingTop: hp('1.97%') },

  statsRow: {
    flexDirection: 'row',
    gap: wp('2.67%'),
    paddingHorizontal: wp('4.27%'),
    marginBottom: hp('2.46%'),
  },

  calendarToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4.27%'),
    marginBottom: hp('1.48%'),
    gap: wp('2.67%'),
  },
  toggleLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  toggleLabel: {
    fontSize: wp('3.2%'),
    color: Colors.primary,
    fontWeight: '700',
  },

  calendarWrapper: {
    marginHorizontal: wp('4.27%'),
    borderRadius: wp('4.8%'),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    marginBottom: hp('1.97%'),
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.49%') },
    shadowOpacity: 0.07,
    shadowRadius: wp('3.2%'),
    elevation: 3,
  },

  dateLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5.33%'),
    marginBottom: hp('1.48%'),
    gap: wp('2.13%'),
  },
  dateLabelDot: {
    width: wp('2.13%'),
    height: wp('2.13%'),
    borderRadius: wp('1.07%'),
    backgroundColor: Colors.primary,
  },
  dateLabel: {
    flex: 1,
    fontSize: wp('4.27%'),
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  shiftPill: {
    backgroundColor: Colors.primary,
    borderRadius: wp('3.2%'),
    paddingHorizontal: wp('2.67%'),
    paddingVertical: hp('0.37%'),
  },
  shiftPillText: { fontSize: wp('2.93%'), color: '#fff', fontWeight: '700' },
});
