import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// import { CURRENT_USER } from './../constants/chatData';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { Platform } from 'react-native';
// import { ToastError } from '../../../utiles/Alert';
// import useFirebaseFunctions from '../../../utiles/useFirebaseFunctions';
// import RNFS from 'react-native-fs';

export const useMediaPicker = () => {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  // const { sendMediaMessageToFirebase } = useFirebaseFunctions();

  const handleMediaSelection = useCallback(async type => {
    try {
      const options = {
        mediaType: type,
        quality: type === 'video' ? 0.6 : 0.8,
        includeBase64: false,
        maxFiles: 1,
        width: type === 'video' ? 1280 : 1920,
        height: type === 'video' ? 720 : 1080,
        compressImageQuality: 0.8,
        compressVideoMaxWidth: 1280,
        compressVideoMaxHeight: 720,
        compressVideoQuality: 0.6,
      };

      const result = await ImagePicker.openPicker(options);
      if (result) {
        const media = Array.isArray(result) ? result[0] : result;
        if (media) {
          setSelectedMedia({ ...media, type });
          setPreviewModalVisible(true);
        }
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        // ToastError('Error', 'Failed to select media. Please try again.');
      }
    }
  }, []);

  //****************************************************************************** */

  const handleMediaConfirm = async () => {
    if (!selectedMedia) return;

    setPreviewModalVisible(false);

    // sendMediaMessageToFirebase({
    //   user_Id: 4,
    //   doctor_Id: 1,
    //   selectedMedia: selectedMedia,
    // });

    setSelectedMedia(null);
  };

  //****************************************************************************** */

  const handleMediaCancel = () => {
    setPreviewModalVisible(false);
    setSelectedMedia(null);
  };
  return {
    previewModalVisible,
    selectedMedia,
    handleMediaSelection,
    handleMediaConfirm,
    handleMediaCancel,
  };
};
