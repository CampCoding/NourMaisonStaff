import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CustomText } from './CustomText';
import { Fonts, hp, wp } from '../constants';

export default function ImageViewModal({
  visible,
  onClose,
  imageUri,
  title,
}: {
  visible: boolean;
  onClose: () => void;
  imageUri: string;
  title: string;
}) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImageError(true);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Close Button - Floating */}
        <TouchableOpacity style={styles.closeButtonFloating} onPress={onClose}>
          {/* <Ionicons name="close-circle" size={wp('10%')} color="white" /> */}
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          {title && (
            <View style={styles.titleContainer}>
              <CustomText style={styles.title}>{title}</CustomText>
            </View>
          )}

          {/* Image */}
          <View style={styles.imageContainer}>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#10b981" />
                <CustomText style={styles.loadingText}>'loading'</CustomText>
              </View>
            )}

            {imageError ? (
              <View style={styles.errorContainer}>
                <CustomText style={styles.errorText}>
                  image load failed
                </CustomText>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => {
                    setImageError(false);
                    setLoading(true);
                  }}
                >
                  <CustomText style={styles.retryButtonText}>retry</CustomText>
                </TouchableOpacity>
              </View>
            ) : (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="contain"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </View>

          {/* Instructions */}
          {!loading && !imageError && (
            <TouchableOpacity
              style={styles.instructionsContainer}
              onPress={onClose}
            >
              <CustomText style={styles.instructionText}>Close</CustomText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonFloating: {
    position: 'absolute',
    top: hp('6%'),
    right: wp('4%'),
    zIndex: 10,
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: wp('6%'),
  },
  titleContainer: {
    position: 'absolute',
    top: hp('6%'),
    left: wp('4%'),
    right: wp('20%'),
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
  },
  title: {
    fontSize: hp('2.2%'),
    fontFamily: Fonts.Bold,
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    width: wp('100%'),
    height: hp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('95%'),
    height: hp('75%'),
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: hp('2%'),
    fontFamily: Fonts.Medium,
    color: 'white',
    marginTop: hp('2%'),
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
  },
  errorText: {
    fontSize: hp('2.2%'),
    fontFamily: Fonts.Medium,
    color: '#999',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  retryButton: {
    marginTop: hp('3%'),
    backgroundColor: '#10b981',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('2%'),
  },
  retryButtonText: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.Bold,
    color: 'white',
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: hp('5%'),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: hp('2%'),
    fontFamily: Fonts.Regular,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});
