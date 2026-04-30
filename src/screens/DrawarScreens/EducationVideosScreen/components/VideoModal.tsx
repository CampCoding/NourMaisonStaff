// import React, { useCallback } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Video } from '../types';
// import CategoryTag from './CategoryTag';
// import { Colors, hp, Icons, wp } from '../../../../constants';
// import { useNavigation } from '@react-navigation/native';
// import { NavigationProp } from '../../../../navigation/type';
// import ScreenNames from '../../../../navigation/ScreenNames';

// interface Props {
//   video: Video | null;
//   visible: boolean;
//   onClose: () => void;
// }

// const VideoModal: React.FC<Props> = ({ video, visible, onClose }) => {
//   const navigation = useNavigation<NavigationProp>();
//   const openVideo = useCallback(() => {
//     navigation.navigate(ScreenNames.VideoDisplayScreen);
//   }, [navigation]);

//   if (!video) return null;
//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       // presentationStyle="pageSheet"
//       onRequestClose={onClose}
//       style={{ backgroundColor: 'transparent' }}
//     >
//       <SafeAreaView style={styles.modalSafe}>
//         {/* <View style={styles.videoPlayer}>
//           <Image source={{ uri: video.thumbnail }} style={styles.playerImage} />
//           <View style={styles.playerOverlay} />
//           <TouchableOpacity style={styles.playerPlayBtn}>
//             <Icons.Play height={wp(7)} width={hp(7)} fill={Colors.white} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
//             <Text style={styles.closeBtnText}>✕</Text>
//           </TouchableOpacity>
//           <View style={styles.progressBar}>
//             <View style={styles.progressFill} />
//           </View>
//           <View style={styles.playerTimings}>
//             <Text style={styles.playerTime}>0:00</Text>
//             <Text style={styles.playerTime}>{video.duration}</Text>
//           </View>
//         </View> */}
//         <View style={{ flex: 1 }} />
//         <ScrollView
//           style={styles.modalScroll}
//           contentContainerStyle={styles.modalContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.modalHeader}>
//             <CategoryTag label={video.subtitle} />
//             <Text style={styles.modalTitle}>{video.title}</Text>
//           </View>

//           <View style={styles.modalMeta}>
//             <View style={styles.avatarCircle}>
//               <Text style={styles.avatarInitial}>{video.instructor[0]}</Text>
//             </View>
//             <View>
//               <Text style={styles.modalInstructorLabel}>Instructor</Text>
//               <Text style={styles.modalInstructor}>{video.instructor}</Text>
//             </View>
//             <View style={styles.modalDurationBox}>
//               <Text style={styles.modalDurationLabel}>Duration</Text>
//               <Text style={styles.modalDurationValue}>{video.duration}</Text>
//             </View>
//           </View>

//           <View style={styles.divider} />

//           <Text style={styles.sectionLabel}>About this video</Text>
//           <Text style={styles.modalDescription}>{video.description}</Text>

//           <TouchableOpacity
//             style={styles.markWatchedBtn}
//             activeOpacity={0.85}
//             onPress={openVideo}
//           >
//             <Text style={styles.markWatchedText}>Show video</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalSafe: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   videoPlayer: {
//     width: '100%',
//     height: hp(30),
//     backgroundColor: '#000',
//     position: 'relative',
//   },
//   playerImage: {
//     width: '100%',
//     height: '100%',
//   },
//   playerOverlay: {
//     backgroundColor: 'rgba(0,0,0,0.45)',
//   },
//   playerPlayBtn: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginTop: -hp(3.5),
//     marginLeft: -wp(7),
//     width: wp(14),
//     height: wp(14),
//     borderRadius: wp(7),
//     backgroundColor: Colors.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   playerPlayIcon: {
//     color: '#fff',
//     fontSize: wp(5.5),
//     marginLeft: wp(1),
//   },
//   closeBtn: {
//     position: 'absolute',
//     top: hp(1.75),
//     right: wp(3.5),
//     width: wp(9),
//     height: wp(9),
//     borderRadius: wp(4.5),
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   closeBtnText: {
//     color: '#fff',
//     fontSize: wp(4),
//     fontWeight: '600',
//   },
//   progressBar: {
//     position: 'absolute',
//     bottom: hp(5),
//     left: wp(4),
//     right: wp(4),
//     height: hp(0.375),
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     borderRadius: wp(0.5),
//     overflow: 'hidden',
//   },
//   progressFill: {
//     width: '0%',
//     height: '100%',
//     backgroundColor: Colors.primary,
//     borderRadius: wp(0.5),
//   },
//   playerTimings: {
//     position: 'absolute',
//     bottom: hp(2),
//     left: wp(4),
//     right: wp(4),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   playerTime: {
//     color: 'rgba(255,255,255,0.75)',
//     fontSize: wp(2.75),
//     fontWeight: '500',
//   },
//   modalScroll: {
//     flex: 1,
//   },
//   modalContent: {
//     padding: wp(6),
//     paddingBottom: hp(5),
//   },
//   modalHeader: {
//     marginBottom: hp(2),
//   },
//   modalTitle: {
//     fontSize: wp(5.5),
//     fontWeight: '800',
//     color: Colors.text,
//     lineHeight: hp(3.5),
//     marginTop: hp(1),
//   },
//   modalMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: wp(3),
//     marginBottom: hp(0.5),
//   },
//   avatarCircle: {
//     width: wp(7),
//     height: wp(7),
//     borderRadius: wp(3.5),
//     backgroundColor: Colors.primaryLight,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: wp(1.5),
//   },
//   avatarInitial: {
//     fontSize: wp(3.25),
//     fontWeight: '700',
//     color: Colors.primaryDark,
//   },
//   modalInstructorLabel: {
//     fontSize: wp(2.5),
//     color: Colors.textMuted,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   modalInstructor: {
//     fontSize: wp(3.5),
//     fontWeight: '700',
//     color: Colors.text,
//   },
//   modalDurationBox: {
//     marginLeft: 'auto',
//     alignItems: 'flex-end',
//   },
//   modalDurationLabel: {
//     fontSize: wp(2.5),
//     color: Colors.textMuted,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   modalDurationValue: {
//     fontSize: wp(3.5),
//     fontWeight: '700',
//     color: Colors.primary,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: Colors.border,
//     marginVertical: hp(2.25),
//   },
//   sectionLabel: {
//     fontSize: wp(3.25),
//     fontWeight: '700',
//     color: Colors.textMuted,
//     textTransform: 'uppercase',
//     letterSpacing: 0.8,
//     marginBottom: hp(1),
//   },
//   modalDescription: {
//     fontSize: wp(3.75),
//     color: Colors.textMuted,
//     lineHeight: hp(3),
//   },
//   markWatchedBtn: {
//     marginTop: hp(3.5),
//     backgroundColor: Colors.primary,
//     borderRadius: wp(3.5),
//     paddingVertical: hp(2),
//     alignItems: 'center',
//     shadowColor: Colors.primary,
//     shadowOffset: { width: 0, height: hp(0.5) },
//     shadowOpacity: 0.3,
//     shadowRadius: wp(2),
//     elevation: 4,
//   },
//   markWatchedText: {
//     color: Colors.surface,
//     fontSize: wp(4),
//     fontWeight: '700',
//     letterSpacing: 0.3,
//   },
// });

// export default VideoModal;
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from '../types';
import CategoryTag from './CategoryTag';
import { Colors, hp, wp } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../../navigation/type';
import ScreenNames from '../../../../navigation/ScreenNames';

interface Props {
  video: Video | null;
  visible: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<Props> = ({ video, visible, onClose }) => {
  const navigation = useNavigation<NavigationProp>();
  const [backColor, setBackColor] = useState('transparent');
  const openVideo = useCallback(() => {
    navigation.navigate(ScreenNames.VideoDisplayScreen);
  }, [navigation]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setBackColor('rgba(0, 0, 0, 0.5)');
      }, 300);
    } else {
      setBackColor('transparent');
    }
  }, [visible]);

  if (!video) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor={backColor} />
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={[styles.backdrop, { backgroundColor: backColor }]}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.bottomSheetContainer}>
          <View style={styles.handleBar} />
          <SafeAreaView style={styles.modalSafe}>
            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalHeader}>
                <CategoryTag label={video.subtitle} />
                <Text style={styles.modalTitle}>{video.title}</Text>
              </View>

              <View style={styles.modalMeta}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitial}>
                    {video.instructor[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalInstructorLabel}>Instructor</Text>
                  <Text style={styles.modalInstructor}>{video.instructor}</Text>
                </View>
                <View style={styles.modalDurationBox}>
                  <Text style={styles.modalDurationLabel}>Duration</Text>
                  <Text style={styles.modalDurationValue}>
                    {video.duration}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionLabel}>About this video</Text>
              <Text style={styles.modalDescription}>{video.description}</Text>

              <TouchableOpacity
                style={styles.markWatchedBtn}
                activeOpacity={0.85}
                onPress={openVideo}
              >
                <Text style={styles.markWatchedText}>Show video</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheetContainer: {
    backgroundColor: Colors.bg || '#FFFFFF',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    height: hp('70%'),
    overflow: 'hidden',
  },
  handleBar: {
    width: wp(12),
    height: hp(0.5),
    backgroundColor: Colors.border || '#E0E0E0',
    borderRadius: wp(1),
    alignSelf: 'center',
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  modalSafe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    padding: wp(6),
    paddingBottom: hp(5),
  },
  modalHeader: {
    marginBottom: hp(2),
  },
  modalTitle: {
    fontSize: wp(5.5),
    fontWeight: '800',
    color: Colors.text,
    lineHeight: hp(3.5),
    marginTop: hp(1),
  },
  modalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(0.5),
  },
  avatarCircle: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(1.5),
  },
  avatarInitial: {
    fontSize: wp(3.25),
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  modalInstructorLabel: {
    fontSize: wp(2.5),
    color: Colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalInstructor: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: Colors.text,
  },
  modalDurationBox: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  modalDurationLabel: {
    fontSize: wp(2.5),
    color: Colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalDurationValue: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: hp(2.25),
  },
  sectionLabel: {
    fontSize: wp(3.25),
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: hp(1),
  },
  modalDescription: {
    fontSize: wp(3.75),
    color: Colors.textMuted,
    lineHeight: hp(3),
  },
  markWatchedBtn: {
    marginTop: hp(3.5),
    backgroundColor: Colors.primary,
    borderRadius: wp(3.5),
    paddingVertical: hp(2),
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.3,
    shadowRadius: wp(2),
    elevation: 4,
  },
  markWatchedText: {
    color: Colors.surface,
    fontSize: wp(4),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default VideoModal;
