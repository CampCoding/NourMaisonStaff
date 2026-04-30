import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, hp, Icons, wp } from './../../../../constants';

const ActionButtons = ({ showActions, onMediaSelect, onToggleRecording }) => {
  if (!showActions) return null;

  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onMediaSelect('photo')}
      >
        <Icons.Camera height={22} width={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onMediaSelect('video')}
      >
        <Icons.VideoCam height={22} width={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onToggleRecording}>
        <Icons.Mic height={22} width={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp('1%'),
  },
  actionButton: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('0.8%'),
  },
});

export default ActionButtons;
