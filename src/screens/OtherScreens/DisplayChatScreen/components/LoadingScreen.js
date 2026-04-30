import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { CustomText } from './../../../../component/CustomText';
import { Colors, Fonts, hp, wp } from './../../../../constants';

export const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingCard}>
      <ActivityIndicator size="large" color={Colors.orangeDark} />
      <CustomText style={styles.loadingText}>Loading ...</CustomText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingCard: {
    backgroundColor: Colors.bg,
    borderRadius: wp('5%'),
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('12%'),
    alignItems: 'center',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.12,
    shadowRadius: wp('4%'),
    elevation: 6,
  },
  loadingText: {
    marginTop: hp('1.8%'),
    fontSize: wp('3.8%'),
    color: Colors.text,
    fontFamily: Fonts.Medium,
  },
});
