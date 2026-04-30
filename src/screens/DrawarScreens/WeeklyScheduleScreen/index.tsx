import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, hp, wp } from '../../../constants';
import PagesHeader from '../../../component/PagesHeader';
import { WeekNavigator } from './components/WeekNavigator';
import { SummaryStrip } from './components/SummaryStrip';
import { ShiftCard } from './components/ShiftCard';
import { calculateTotalWorkMinutes, getMondayOf } from './utiles';
import { generateWeekData } from './components/shiftTemplates';

const WeeklyScheduleScreen: React.FC = () => {
  const todayMonday = getMondayOf(new Date());
  const [currentMonday, setCurrentMonday] = useState<Date>(todayMonday);
  const flatListRef = useRef<FlatList>(null);

  const shifts = generateWeekData(currentMonday);

  useEffect(() => {
    const d = new Date();
    const day = d.getDay();
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: day + 1,
        animated: true,
      });
    }, 200);
  }, []);

  const goToPrev = () => {
    const prev = new Date(currentMonday);
    prev.setDate(currentMonday.getDate() - 7);
    setCurrentMonday(prev);
  };

  const goToNext = () => {
    const next = new Date(currentMonday);
    next.setDate(currentMonday.getDate() + 7);
    setCurrentMonday(next);
  };

  const earliestMonday = new Date(todayMonday);
  earliestMonday.setDate(todayMonday.getDate() - 28);
  const canGoPrev = currentMonday > earliestMonday;

  const totalWorkMins = calculateTotalWorkMinutes(shifts);
  const totalH = Math.floor(totalWorkMins / 60);
  const totalM = totalWorkMins % 60;
  const totalLabel = totalM === 0 ? `${totalH}h` : `${totalH}h ${totalM}m`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      <PagesHeader name="Week Schedule" subName="Schedule for next weeks" />

      <WeekNavigator
        monday={currentMonday}
        onPrev={goToPrev}
        onNext={goToNext}
        canGoPrev={canGoPrev}
      />

      <SummaryStrip totalLabel={totalLabel} />

      <FlatList
        ref={flatListRef}
        data={shifts}
        keyExtractor={item => item.date}
        renderItem={({ item }) => <ShiftCard shift={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListFooterComponent={<View style={{ height: hp(4) }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: wp(5) },
});

export default WeeklyScheduleScreen;
