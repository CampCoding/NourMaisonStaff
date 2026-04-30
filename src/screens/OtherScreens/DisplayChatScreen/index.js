import React, { useEffect, useState, useCallback, use } from 'react';
import {
  StyleSheet,
  ImageBackground,
  // StatusBar,
  KeyboardAvoidingView,
  Alert,
  View,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import { Images, Colors, hp, wp, Fonts } from './../../../constants';

import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import CustomInputToolbar from './components/CustomInputToolbar';
import MediaPreviewModal from './components/MediaPreviewModal';
import MessageMedia from './components/MessageMedia';
import { useAudioRecording } from './hooks/useAudioRecording';
import { useMediaPicker } from './hooks/useMediaPicker';
import { LoadingScreen } from './components/LoadingScreen';
import SendButton from './components/SendButton';
import { SafeAreaView } from 'react-native-safe-area-context';
// import useFirebaseFunctions from '../../utiles/useFirebaseFunctions';
// import { useSelector } from 'react-redux';

const DisplayChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();

  const {
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
  } = useAudioRecording();

  const {
    previewModalVisible,
    selectedMedia,
    handleMediaSelection,
    handleMediaConfirm,
    handleMediaCancel,
  } = useMediaPicker();

  // const { sendMessage, getAllMessages, markMessagesAsRead } =
  // useFirebaseFunctions();
  // const { userData } = useSelector(state => state.UserReducer);

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     getAllMessages({
  //       user_Id: userData.user_id,
  //       callback: setMessages,
  //       doctor_Id: 1,
  //       setLoading,
  //     });
  //   }, 600);
  //   markMessagesAsRead();
  //   return () => clearTimeout(timer);
  // }, []);

  const onSend = useCallback((newMessages = []) => {
    // try {
    //   const mes = {
    //     user_Id: userData.user_id,
    //     message: newMessages[0].text,
    //     type: 'sent',
    //     replyMessage: newMessages[0].replyMessage,
    //   };
    //   sendMessage(mes);
    // } catch (error) {
    //   console.error('Error sending message:', error);
    // }
  }, []);

  const handleDeleteMessage = useCallback(messageId => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setMessages(prev => prev.filter(msg => msg._id !== messageId)),
        },
      ],
    );
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const renderSendComponent = props => (
    <MessageBubble {...props} onDelete={handleDeleteMessage} />
  );

  const renderInputToolbarComponent = props => (
    <CustomInputToolbar
      {...props}
      inputText={inputText}
      setInputText={setInputText}
      recordingMode={recordingMode}
      recordTime={recordTime}
      recordedAudioPath={recordedAudioPath}
      isReviewPlaying={isReviewPlaying}
      reviewTime={reviewTime}
      reviewDuration={reviewDuration}
      onToggleRecording={toggleRecording}
      onCancelRecording={cancelRecording}
      onSendAudio={() => {
        sendRecordedAudio(setMessages);
      }}
      onTogglePlayPause={toggleReviewPlayPause}
      onMediaSelect={handleMediaSelection}
    />
  );

  const renderMessageImage = props => <MessageMedia type="image" {...props} />;
  const renderMessageVideo = props => <MessageMedia type="video" {...props} />;
  const renderMessageAudio = props => <MessageMedia type="audio" {...props} />;
  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader onBackPress={() => navigation.goBack()} />

      <ImageBackground
        source={Images.ChatBackground}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.7 }}
        resizeMode="cover"
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          // user={{ _id: userData.user_id }}
          user={{ _id: 1 }}
          renderSend={props => <SendButton {...props} />}
          renderBubble={renderSendComponent}
          renderInputToolbar={renderInputToolbarComponent}
          renderMessageImage={renderMessageImage}
          renderMessageVideo={renderMessageVideo}
          renderMessageAudio={renderMessageAudio}
          textInputProps={{
            style: styles.textInput,
            placeholder: 'Type a message...',
            placeholderTextColor: Colors.mintLight,
          }}
          reply={{
            swipe: {
              isEnabled: true,
              direction: 'left',
            },
          }}
          alwaysShowSend
          scrollToBottom
          infiniteScroll
          maxComposerHeight={100}
          minComposerHeight={40}
          maxInputLength={1000}
          listViewProps={{
            showsVerticalScrollIndicator: false,
            removeClippedSubviews: false,
          }}
          onInputTextChanged={setInputText}
        />
      </ImageBackground>

      <MediaPreviewModal
        visible={previewModalVisible}
        media={selectedMedia}
        onConfirm={() => {
          handleMediaConfirm();
        }}
        onCancel={handleMediaCancel}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingBottom: hp(1.5),
    // paddingTop: StatusBar.currentHeight + hp(1) || hp('6%'),
  },
  textInput: {
    flex: 1,
    fontSize: wp('3.8%'),
    color: Colors.text,
    backgroundColor: Colors.light,
    borderRadius: wp('5.5%'),
    borderWidth: wp('0.2%'),
    borderColor: Colors.primaryLight,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
    marginHorizontal: wp('1.5%'),
    maxHeight: hp('12%'),
    minHeight: hp('5%'),
    fontFamily: Fonts.Regular,
  },
});

export default DisplayChatScreen;
