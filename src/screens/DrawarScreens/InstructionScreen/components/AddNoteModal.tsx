import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
import { CustomText } from '../../../../component/CustomText';

const AddNoteModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [content, setContent] = useState('');
  //   const { AddNote } = useStartupFunctions();
  //   const { isNoteLoading } = useSelector(state => state.ExtraReducer);

  const handleClose = () => {
    setContent('');
    onClose?.();
  };

  const charCount = content.length;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <StatusBar backgroundColor={Colors.modalBackground} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.kavWrapper}
          >
            <View style={styles.sheet}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.iconCircle}>
                    <CustomText style={styles.iconEmoji}>📝</CustomText>
                  </View>
                  <CustomText style={styles.headerTitle}>New note</CustomText>
                </View>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeBtn}
                  activeOpacity={0.7}
                >
                  <CustomText style={styles.closeBtnText}>✕</CustomText>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              <View style={styles.scrollContent}>
                <View style={[styles.inputWrapper, styles.contentWrapper]}>
                  <TextInput
                    style={styles.contentInput}
                    placeholder={'Write new note'}
                    placeholderTextColor={Colors.primaryLight}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                    maxLength={500}
                  />
                  <CustomText style={styles.charCount}>
                    {`${charCount}/${500}`}
                  </CustomText>
                </View>
              </View>

              {/* Footer Buttons */}
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.cancelBtn}
                  activeOpacity={0.75}
                >
                  <CustomText style={styles.cancelBtnText}>Cancel</CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.saveBtn,
                    { opacity: !content.trim() ? 0.5 : 1 },
                  ]}
                  activeOpacity={0.8}
                  disabled={!content.trim()}
                >
                  {false ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <CustomText style={styles.saveBtnText}>Save</CustomText>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modalBackground,
    justifyContent: 'center',
  },
  backdrop: {
    // Empty but kept for structure
  },
  kavWrapper: {
    width: '100%',
  },
  sheet: {
    backgroundColor: Colors.background1,
    borderRadius: wp('7%'),
    paddingBottom: hp('4%'),
    margin: wp(4),
    maxHeight: hp('90%'),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2.5%'),
  },
  iconCircle: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: wp('5%'),
  },
  headerTitle: {
    fontSize: wp('5%'),
    color: Colors.text,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: wp('8.5%'),
    height: wp('8.5%'),
    borderRadius: wp('4.25%'),
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: wp('3.8%'),
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light,
    marginHorizontal: wp('5%'),
    marginBottom: hp('0.5%'),
  },
  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: wp('4%'),
    paddingBottom: hp('1%'),
  },
  inputWrapper: {
    backgroundColor: Colors.bg,
    borderRadius: wp('4%'),
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.4%'),
  },
  contentWrapper: {
    minHeight: hp('16%'),
    paddingBottom: hp('1%'),
    borderColor: Colors.primary,
  },
  contentInput: {
    fontSize: wp('4%'),
    color: Colors.text,
    lineHeight: hp('2.8%'),
    minHeight: hp('12%'),
    padding: 0,
    margin: 0,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: wp('3%'),
    color: Colors.primaryLight,
    marginTop: hp('0.5%'),
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    gap: wp('3%'),
  },
  cancelBtn: {
    flex: 1,
    height: hp('6.5%'),
    borderRadius: wp('4%'),
    backgroundColor: Colors.background1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: wp('4%'),
    color: Colors.textMuted,
  },
  saveBtn: {
    flex: 2,
    height: hp('6.5%'),
    borderRadius: wp('4%'),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  saveBtnText: {
    fontSize: wp('4.2%'),
    color: Colors.white,
    letterSpacing: 0.2,
  },
});

export default AddNoteModal;
