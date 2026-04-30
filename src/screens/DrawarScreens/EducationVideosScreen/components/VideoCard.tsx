import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, wp, hp, Icons } from '../../../../constants';
import { VideoCardProps } from '../types';
import CategoryTag from './CategoryTag';

const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => (
  <TouchableOpacity
    style={styles.videoCard}
    onPress={() => onPress(video)}
    activeOpacity={0.85}
  >
    <View style={styles.thumbContainer}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumb} />
      <View style={styles.thumbOverlay} />
      <View style={styles.playButtonSmall}>
        <Icons.Play height={wp(5)} width={hp(5)} fill={Colors.white} />
      </View>
      {video.watched && <View style={styles.watchedDot} />}
    </View>
    <View style={styles.cardBody}>
      <CategoryTag label={video.subtitle} />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {video.title}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  videoCard: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginBottom: hp(1.75),
    backgroundColor: Colors.surface,
    borderRadius: wp(4),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.06,
    shadowRadius: wp(1.5),
    elevation: 2,
  },
  thumbContainer: {
    width: wp(27.5),
    height: hp(11.25),
    position: 'relative',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  thumbOverlay: {
    backgroundColor: 'rgba(44,34,24,0.28)',
  },
  playButtonSmall: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -wp(4),
    marginLeft: -wp(4),
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: 'rgba(221,153,51,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconSmall: {
    color: Colors.white,
    fontSize: wp(3),
    marginLeft: wp(0.5),
  },
  watchedDot: {
    position: 'absolute',
    top: hp(1),
    right: wp(2),
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: Colors.secondary,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  cardBody: {
    flex: 1,
    padding: wp(3),
    // justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: wp(3.25),
    fontWeight: '700',
    color: Colors.text,
    lineHeight: hp(2.25),
    marginVertical: hp(0.5),
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInstructor: {
    fontSize: wp(2.75),
    color: Colors.textMuted,
    fontWeight: '500',
  },
  cardDuration: {
    fontSize: wp(2.75),
    color: Colors.textMuted,
  },
  avatarCircleSmall: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(1.25),
  },
  avatarInitialSmall: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: Colors.primaryDark,
  },
});

export default VideoCard;
