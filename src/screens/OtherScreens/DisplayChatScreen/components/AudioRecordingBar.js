import React from 'react';
import { View, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { Colors, Fonts, hp, Icons, wp } from './../../../../constants';
import { CustomText } from './../../../../component/CustomText';

const isRTL = I18nManager.isRTL;
const AudioRecordingBar = ({
  recordingMode,
  recordTime,
  isReviewPlaying,
  reviewTime,
  reviewDuration,
  onCancel,
  onSend,
  onTogglePlayPause,
  onStopRecording,
}) => {
  return (
    <View style={styles.audioToolbar}>
      <View style={styles.audioInfo}>
        {recordingMode === 'recording' ? (
          <>
            <View style={styles.recordingDot} />
            <CustomText style={styles.audioLabel}>Recording</CustomText>
            <CustomText style={styles.audioTimer}>{recordTime}</CustomText>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={onTogglePlayPause}
              style={styles.playPauseBtn}
            >
              {isReviewPlaying ? (
                <Icons.PauseCircle
                  height={22}
                  width={22}
                  color={Colors.primary}
                />
              ) : (
                <Icons.PlayCircle
                  height={22}
                  width={22}
                  color={Colors.primary}
                />
              )}
            </TouchableOpacity>
            <CustomText style={styles.audioTimer}>{reviewTime}</CustomText>
            <CustomText style={styles.audioDuration}>
              {' '}
              / {reviewDuration}
            </CustomText>
          </>
        )}
      </View>

      <View style={styles.audioActions}>
        <TouchableOpacity style={styles.audioActionBtn} onPress={onCancel}>
          <Icons.Delete height={20} width={20} color={Colors.primaryDark} />
        </TouchableOpacity>

        {recordingMode === 'recording' && (
          <TouchableOpacity
            style={styles.audioActionBtn}
            onPress={onStopRecording}
          >
            <Icons.StopCircle height={22} width={22} color={Colors.primary} />
          </TouchableOpacity>
        )}

        {recordingMode === 'review' && (
          <TouchableOpacity style={styles.sendButton} onPress={onSend}>
            <Icons.Send height={18} width={18} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    borderTopWidth: hp('0.1%'),
    borderTopColor: Colors.primaryLight,
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1.5%'),
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('-0.2%') },
    shadowOpacity: 0.06,
    shadowRadius: wp('2%'),
    elevation: 4,
  },
  audioInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingDot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    backgroundColor: Colors.primaryDark,
    marginRight: wp('2%'),
  },
  audioLabel: {
    fontSize: wp('3.5%'),
    color: Colors.text,
    fontFamily: Fonts.Medium,
    marginRight: wp('2%'),
  },
  audioTimer: {
    fontSize: wp('3.8%'),
    fontWeight: '700',
    color: Colors.primaryDark,
    fontFamily: Fonts.Bold,
  },
  audioDuration: {
    fontSize: wp('3.2%'),
    color: Colors.secondary,
    fontFamily: Fonts.Regular,
  },
  playPauseBtn: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  audioActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioActionBtn: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    backgroundColor: Colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1.5%'),
  },
  sendButton: {
    width: wp('9.5%'),
    height: wp('9.5%'),
    borderRadius: wp('4.75%'),
    backgroundColor: Colors.primaryDark,
    transform: isRTL ? [{ rotate: '180deg' }] : [],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1.5%'),
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.2%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('1.5%'),
    elevation: 4,
  },
});

export default AudioRecordingBar;
