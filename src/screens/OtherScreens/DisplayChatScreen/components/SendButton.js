import React from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { Send } from 'react-native-gifted-chat';
import { Colors, Fonts, hp, Icons, wp } from './../../../../constants';

const isRTL = I18nManager.isRTL;

const SendButton = props => (
  <Send {...props} containerStyle={styles.sendWrapper}>
    <View style={styles.sendButton}>
      <Icons.Send height={18} width={18} color={Colors.white} />
    </View>
  </Send>
);

const styles = StyleSheet.create({
  sendWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('1%'),
    alignSelf: 'flex-end',
  },
  sendButton: {
    width: wp('9.5%'),
    height: wp('9.5%'),
    borderRadius: wp('4.75%'),
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    transform: isRTL ? [{ rotate: '180deg' }] : [],
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.2%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('1.5%'),
    elevation: 4,
  },
});

export default SendButton;
