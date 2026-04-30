import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { CustomText } from './../../../../component/CustomText';
import { Colors, Fonts, hp, Icons, Images, wp } from './../../../../constants';
import { useNavigation } from '@react-navigation/native';

const ChatHeader = ({ onBackPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarInner}>
            <Image source={Images.Logo} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.headerText}>
          <CustomText style={styles.heading}>Nourmasion Staff</CustomText>
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
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: hp('1%'),
    backgroundColor: Colors.bg,
    borderBottomWidth: hp('0.1%'),
    paddingHorizontal: wp('3%'),
    borderBottomColor: Colors.primaryLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: wp('3%'),
  },
  roleBadge: {
    backgroundColor: Colors.secondary + '22',
    borderRadius: wp('5.33%'),
    paddingHorizontal: wp('3.2%'),
    paddingVertical: hp('0.62%'),
    borderWidth: 1,
    borderColor: Colors.secondary + '44',
  },
  avatarInner: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    backgroundColor: Colors.bg,
    borderWidth: wp('0.5%'),
    borderColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('6.5%'),
    backgroundColor: Colors.primaryLight,
  },
  headerText: { flex: 1 },
  heading: {
    fontSize: wp('4.5%'),
    color: Colors.text,
    fontWeight: '700',
    fontFamily: Fonts.Bold,
  },
});

export default ChatHeader;
