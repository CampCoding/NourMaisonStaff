import { useState, useCallback, useRef } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import AudioRecorderPlayer from 'react-native-nitro-sound';

export const useAudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingMode, setRecordingMode] = useState('idle');
  const [recordTime, setRecordTime] = useState('00:00');
  const audioRecorderPlayer = useRef(AudioRecorderPlayer).current;
  const [recordedAudioPath, setRecordedAudioPath] = useState(null);
  const [isReviewPlaying, setIsReviewPlaying] = useState(false);
  const [reviewTime, setReviewTime] = useState('00:00');
  const [reviewDuration, setReviewDuration] = useState('00:00');

  const requestMicPermissionIfNeeded = useCallback(async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
      return false;
    }
  }, []);

  const startRecording = useCallback(async () => {
    const micOk = await requestMicPermissionIfNeeded();
    if (!micOk) {
      Alert.alert(
        'Permission',
        'Microphone permission is required to record audio.',
      );
      return;
    }
    try {
      const uri = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      setRecordingMode('recording');
      setRecordedAudioPath(uri);
      setRecordTime('00:00');
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordTime(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        );
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  }, [audioRecorderPlayer, requestMicPermissionIfNeeded]);

  const stopRecordingAndSend = useCallback(async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      if (result) {
        const normalizedPath = result.startsWith('file://')
          ? result
          : `file://${result}`;
        setRecordedAudioPath(normalizedPath);
        setRecordingMode('review');
        setReviewTime(recordTime);
        setReviewDuration(recordTime);
      }
    } catch (error) {
      setIsRecording(false);
    }
  }, [audioRecorderPlayer, recordTime]);

  const toggleRecording = useCallback(() => {
    if (isRecording) stopRecordingAndSend();
    else startRecording();
  }, [isRecording, startRecording, stopRecordingAndSend]);

  const cancelRecording = useCallback(async () => {
    try {
      if (isRecording) {
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
      } else {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
      }
    } catch (e) {}
    setIsRecording(false);
    setRecordingMode('idle');
    setRecordedAudioPath(null);
    setRecordTime('00:00');
    setIsReviewPlaying(false);
    setReviewTime('00:00');
    setReviewDuration('00:00');
  }, [audioRecorderPlayer, isRecording]);

  //************************************************************************************ */
  const sendRecordedAudio = useCallback(
    async setMessages => {
      if (!recordedAudioPath) {
        Alert.alert('Audio', 'No recording to send.');
        return;
      }
      try {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
      } catch (e) {}
      setIsReviewPlaying(false);
      setRecordingMode('idle');
      setRecordedAudioPath(null);
      setRecordTime('00:00');
      setReviewTime('00:00');
      setReviewDuration('00:00');

      const newMessage = {
        _id: Date.now().toString(),
        createdAt: new Date(),
        text: '',
        user: { _id: 1 },
        audio: recordedAudioPath,
      };

      setMessages(prev => GiftedChat.append(prev, [newMessage]));
    },
    [audioRecorderPlayer, recordedAudioPath],
  );

  //************************************************************************************ */
  const toggleReviewPlayPause = useCallback(async () => {
    if (!recordedAudioPath) return;
    try {
      if (isReviewPlaying) {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setIsReviewPlaying(false);
      } else {
        await audioRecorderPlayer.startPlayer(recordedAudioPath);
        setIsReviewPlaying(true);
        audioRecorderPlayer.addPlayBackListener(e => {
          setReviewTime(
            audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          );
          setReviewDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
          if (e.currentPosition >= e.duration) {
            setIsReviewPlaying(false);
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
          }
        });
      }
    } catch (error) {
      setIsReviewPlaying(false);
    }
  }, [audioRecorderPlayer, isReviewPlaying, recordedAudioPath]);

  return {
    recordingMode,
    recordTime,
    recordedAudioPath,
    isReviewPlaying,
    reviewTime,
    reviewDuration,
    toggleRecording,
    cancelRecording,
    sendRecordedAudio,
    toggleReviewPlayPause,
  };
};
