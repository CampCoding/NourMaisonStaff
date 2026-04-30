import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';
import { CustomText } from './../../../../component/CustomText';
// import CloseIcon from '../../../assets/icons/xCircle.svg';
import { Colors, Fonts, hp, Icons, wp } from './../../../../constants';

const MediaPreviewModal = ({ visible, media, onConfirm, onCancel }) => {
  if (!visible || !media) return null;

  const isImage = media.type === 'photo';
  console.log('MediaPreviewModal Rendered with media:', media);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.previewModalOverlay}>
        <View style={styles.previewModalContent}>
          <View style={styles.previewHeader}>
            <CustomText style={styles.previewTitle}>
              Preview {isImage ? 'Image' : 'Video'}
            </CustomText>
            <TouchableOpacity onPress={onCancel} style={styles.previewCloseBtn}>
              <Icons.Close height={22} width={22} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.previewMediaContainer}>
            {isImage ? (
              <Image
                source={{ uri: media.path }}
                style={styles.previewMedia}
                resizeMode="contain"
              />
            ) : (
              <>
                <Video
                  source={{
                    uri: 'https://sanad.academy/sanad_academy/videos/1504990080_1777381463video.mp4',
                  }}
                  style={styles.previewMedia}
                  resizeMode="contain"
                  controls
                  paused={false}
                  repeat
                  onError={error => console.log('Video error:', error)}
                />
              </>
            )}
          </View>

          <View style={styles.previewActions}>
            <TouchableOpacity
              style={styles.previewCancelButton}
              onPress={onCancel}
            >
              <CustomText style={styles.previewCancelText}>Cancel</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.previewSendButton}
              onPress={onConfirm}
            >
              <CustomText style={styles.previewSendText}>Send</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  previewModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(9, 36, 66, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewModalContent: {
    width: wp('92%'),
    height: hp('78%'),
    backgroundColor: Colors.bg,
    borderRadius: wp('5%'),
    overflow: 'hidden',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4.5%'),
    paddingVertical: hp('1.8%'),
    backgroundColor: Colors.light,
    borderBottomWidth: hp('0.1%'),
    borderBottomColor: Colors.primaryLight,
  },
  previewTitle: {
    fontSize: wp('4.2%'),
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Fonts.Bold,
  },
  previewCloseBtn: {
    width: wp('8.5%'),
    height: wp('8.5%'),
    borderRadius: wp('4.25%'),
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewMediaContainer: {
    flex: 1,
    backgroundColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewMedia: { width: '100%', height: '100%' },
  previewActions: {
    flexDirection: 'row',
    padding: wp('4%'),
    backgroundColor: Colors.light,
    borderTopWidth: hp('0.1%'),
    borderTopColor: Colors.primaryLight,
  },
  previewCancelButton: {
    flex: 1,
    paddingVertical: hp('1.6%'),
    paddingHorizontal: wp('4%'),
    marginRight: wp('2%'),
    borderRadius: wp('3%'),
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  previewCancelText: {
    fontSize: wp('3.8%'),
    fontWeight: '600',
    color: Colors.text,
    fontFamily: Fonts.SemiBold,
  },
  previewSendButton: {
    flex: 1,
    paddingVertical: hp('1.6%'),
    paddingHorizontal: wp('4%'),
    marginLeft: wp('2%'),
    borderRadius: wp('3%'),
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.4%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
    elevation: 4,
  },
  previewSendText: {
    fontSize: wp('3.8%'),
    fontWeight: '700',
    color: Colors.white,
    fontFamily: Fonts.Bold,
  },
});

export default MediaPreviewModal;
