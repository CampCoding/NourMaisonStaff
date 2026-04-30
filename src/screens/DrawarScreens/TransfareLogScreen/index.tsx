import React, { useState } from 'react';
import { View, Text, FlatList, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterTab, TransferRecord } from './types';
import { TRANSFERS } from './data';
import { SummaryCard } from './components/SummaryCard';
import { FilterTabs } from './components/FilterTabs';
import { MonthSectionHeader } from './components/MonthSectionHeader';
import { TransferCard } from './components/TransferCard';
import PagesHeader from '../../../component/PagesHeader';
import { Colors, hp, wp } from '../../../constants';
import ImageViewModal from '../../../component/ImagePreviewModal';

type ListItem =
  | { kind: 'header'; month: string }
  | { kind: 'card'; data: TransferRecord };

const TransferLogScreen = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [selectedItemTitle, setSelectedItemTitle] = useState<string>('');
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const filtered =
    activeFilter === 'all'
      ? TRANSFERS
      : TRANSFERS.filter(t => t.type === activeFilter);

  const counts: Record<FilterTab, number> = {
    all: TRANSFERS.length,
    salary: TRANSFERS.filter(t => t.type === 'salary').length,
    advance: TRANSFERS.filter(t => t.type === 'advance').length,
  };

  const listItems: ListItem[] = [];
  let lastMonth = '';
  for (const record of filtered) {
    const month = record.month ?? '';
    if (month !== lastMonth) {
      listItems.push({ kind: 'header', month });
      lastMonth = month;
    }
    listItems.push({ kind: 'card', data: record });
  }

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.kind === 'header') {
      return <MonthSectionHeader title={item.month} />;
    }
    return (
      <TransferCard
        item={item.data}
        onPress={() => {
          setSelectedItemTitle(item.data.month ?? '');
          setImageModalVisible(true);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <PagesHeader name="Transfer Log" subName="Salary & Advance history" />

      <ImageViewModal
        visible={imageModalVisible}
        onClose={() => {
          setImageModalVisible(false);
        }}
        title={''}
        imageUri="https://pbs.twimg.com/media/Gyp4X2iWIAAkYPR.jpg"
      />
      <FlatList
        data={listItems}
        keyExtractor={(item, idx) =>
          item.kind === 'header'
            ? `header-${item.month}`
            : `card-${item.data.id}-${idx}`
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <SummaryCard transfers={TRANSFERS} />
            <FilterTabs
              active={activeFilter}
              onChange={setActiveFilter}
              counts={counts}
            />
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No records found</Text>
            <Text style={styles.emptySub}>
              No transfers match the selected filter.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  listContent: {
    paddingBottom: hp(5),
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: hp(7.5),
    paddingBottom: hp(5),
  },
  emptyIcon: {
    fontSize: hp(6),
    marginBottom: hp(1.5),
  },
  emptyTitle: {
    fontSize: hp(2.1),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: hp(0.75),
  },
  emptySub: {
    fontSize: hp(1.6),
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: wp(10),
  },
});

export default TransferLogScreen;
