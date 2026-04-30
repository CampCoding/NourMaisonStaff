import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import { InputToolbar } from 'react-native-gifted-chat';
import { Colors, Fonts, hp, wp } from './../../../../constants';

import ActionButtons from './ActionButtons';
import AudioRecordingBar from './AudioRecordingBar';

const CustomInputToolbar = props => {
  const {
    inputText,
    recordingMode,
    recordTime,
    recordedAudioPath,
    isReviewPlaying,
    reviewTime,
    reviewDuration,
    onToggleRecording,
    onCancelRecording,
    onSendAudio,
    onTogglePlayPause,
    onMediaSelect,
  } = props;

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  if (recordingMode !== 'idle') {
    return (
      <AudioRecordingBar
        recordingMode={recordingMode}
        recordTime={recordTime}
        recordedAudioPath={recordedAudioPath}
        isReviewPlaying={isReviewPlaying}
        reviewTime={reviewTime}
        reviewDuration={reviewDuration}
        onCancel={onCancelRecording}
        onSend={onSendAudio}
        onTogglePlayPause={onTogglePlayPause}
        onStopRecording={onToggleRecording}
      />
    );
  }

  return (
    <InputToolbar
      {...props}
      // actions={""}
      containerStyle={[
        styles.inputToolbar,
        { paddingBottom: keyboardVisible ? hp(10) : hp(1) },
      ]}
      primaryStyle={styles.inputPrimary}
      renderActions={() => (
        <ActionButtons
          showActions={!keyboardVisible}
          onMediaSelect={onMediaSelect}
          onToggleRecording={onToggleRecording}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: Colors.bg,
    borderTopWidth: hp('0.1%'),
    borderTopColor: Colors.primaryLight,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('2%'),
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('-0.2%') },
    shadowOpacity: 0.06,
    shadowRadius: wp('2%'),
    elevation: 4,
  },
  inputPrimary: { alignItems: 'center' },
});

export default CustomInputToolbar;
