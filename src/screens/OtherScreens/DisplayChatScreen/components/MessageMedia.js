import React from 'react';
import { StyleSheet } from 'react-native';
import {
  MessageAudio,
  MessageImage,
  MessageVideo,
} from 'react-native-gifted-chat';
import { Images, Colors, hp, wp } from './../../../../constants';

const MessageMedia = ({ type, ...props }) => {
  if (type === 'image') {
    return (
      <MessageImage
        {...props}
        imageStyle={styles.messageImage}
        imageProps={{ resizeMode: 'cover' }}
      />
    );
  }

  if (type === 'audio') {
    return (
      <MessageAudio
        {...props}
        // imageStyle={styles.messageImage}
        // imageProps={{ resizeMode: 'cover' }}
      />
    );
  }

  return (
    <MessageVideo
      {...props}
      videoStyle={styles.messageVideo}
      videoProps={{ resizeMode: 'cover', controls: true, paused: true }}
    />
  );
};

const styles = StyleSheet.create({
  messageImage: {
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: wp('3.5%'),
  },
  messageVideo: {
    width: wp('50%'),
    height: wp('37.5%'),
    borderRadius: wp('3.5%'),
  },
});

export default MessageMedia;
