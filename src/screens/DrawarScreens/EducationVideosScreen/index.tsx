import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagesHeader from '../../../component/PagesHeader';
import { Colors, hp, wp } from '../../../constants';
import { Video } from './types';
import { CATEGORIES, VIDEOS } from './data';
import CategoryPill from './components/CategoryPill';
import VideoCard from './components/VideoCard';
import VideoModal from './components/VideoModal';

const EducationVideosScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const filteredVideos = VIDEOS.filter(v =>
    activeCategory === 'all' ? !v.featured : v.category === activeCategory,
  );

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <PagesHeader name="Education Hub" subName="Staff Training" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {CATEGORIES.map(cat => (
          <CategoryPill
            key={cat.id}
            item={cat}
            selected={activeCategory === cat.id}
            onPress={() => setActiveCategory(cat.id)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredVideos}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={<View style={styles.bottomSpacer} />}
        renderItem={({ item, index }) => (
          <VideoCard key={index} video={item} onPress={openVideo} />
        )}
      />

      <VideoModal
        video={selectedVideo}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    // flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'green',
  },
  scrollContent: {
    paddingBottom: hp(4),
    justifyContent: 'flex-start',
    backgroundColor: 'red',
  },
  pillRow: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginBottom: wp(4),
    gap: wp(2),
    flexDirection: 'row',
  },
  bottomSpacer: {
    height: hp(30),
  },
});

export default EducationVideosScreen;
