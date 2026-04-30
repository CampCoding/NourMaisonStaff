import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import { Colors, Fonts, hp, wp } from './../../../../constants';
import Clipboard from '@react-native-clipboard/clipboard';
// import { useSelector } from 'react-redux';

const MessageBubble = props => {
  // const { userData } = useSelector(state => state.UserReducer);

  const { currentMessage, onDelete } = props;
  // const isAdminMessage = currentMessage.user._id === userData.user_id;
  const isAdminMessage = false;
  const hasMedia =
    currentMessage.image || currentMessage.video || currentMessage.audio;

  const handleDeletePress = () => {
    onDelete(currentMessage._id);
  };

  // if (hasMedia) {
  //   return <View style={styles.mediaBubbleContainer}>{props.children}</View>;
  // }

  return (
    <View>
      <Bubble
        {...props}
        onLongPressMessage={(context, message) => {
          if (message?.text) {
            Clipboard.setString(message.text);
            // Alert.alert('Copied', 'Message copied to clipboard.');
            // Toasts.Success('تم النسخ', 'لقد قمت بنسخ الرسالة بنجاح');
          }
        }}
        wrapperStyle={{
          left: styles.bubbleLeft,
          right: styles.bubbleRight,
        }}
        textStyle={{
          left: styles.bubbleTextLeft,
          right: styles.bubbleTextRight,
        }}
        timeTextStyle={{
          left: { color: Colors.primary, fontSize: 11 },
          right: { color: Colors.primary, fontSize: 11 },
        }}
        position={!isAdminMessage ? 'left' : 'right'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleLeft: {
    backgroundColor: Colors.bg,
    borderRadius: wp('4.5%'),
    borderBottomLeftRadius: wp('1%'),
    paddingHorizontal: wp('1%'),
    paddingVertical: hp('0.2%'),
    // shadowColor: Colors.text,
    // shadowOffset: { width: 0, height: hp('0.1%') },
    // shadowOpacity: 0.06,
    // shadowRadius: wp('1%'),
    // elevation: 2,
  },
  bubbleRight: {
    backgroundColor: Colors.primaryDark,
    borderRadius: wp('4.5%'),
    borderBottomRightRadius: wp('1%'),
    paddingHorizontal: wp('1%'),
    paddingVertical: hp('0.2%'),
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.2%') },
    shadowOpacity: 0.25,
    shadowRadius: wp('1.5%'),
    elevation: 3,
  },
  bubbleTextLeft: {
    color: Colors.text,
    fontSize: wp('3.8%'),
    fontFamily: Fonts.Regular,
    lineHeight: hp('2.8%'),
  },
  bubbleTextRight: {
    color: Colors.white,
    fontSize: wp('3.8%'),
    fontFamily: Fonts.Regular,
    lineHeight: hp('2.8%'),
  },
  mediaBubbleContainer: {
    marginVertical: hp('0.5%'),
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.light,
    borderRadius: 12,
    padding: 4,
    zIndex: 1000,
  },
});

export default MessageBubble;
