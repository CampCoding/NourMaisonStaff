import React, { useState } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagesHeader from '../../../component/PagesHeader';
import { Colors, hp, wp } from '../../../constants';
import { CategoryKey, RoleKey } from './types';
import { SOPS } from './data';
import SOPCard from './components/SOPCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import ResultsBar from './components/ResultsBar';
import EmptyState from './components/EmptyState';
import RoleFilter from './components/RoleFilter';

const RestaurantInstructionsScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null,
  );
  const [searchText, setSearchText] = useState('');

  const filtered = SOPS.filter(sop => {
    const matchRole =
      selectedRole === 'all' ||
      sop.roles.includes(selectedRole) ||
      sop.roles.includes('all');
    const matchCat = !selectedCategory || sop.category === selectedCategory;
    const matchSearch =
      !searchText || sop.title.toLowerCase().includes(searchText.toLowerCase());
    return matchRole && matchCat && matchSearch;
  });

  // if (activeItem) {
  //   return (
  //     <SafeAreaView style={styles.safeArea}>
  //       <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
  //       <SOPDetail item={activeItem} onBack={() => setActiveItem(null)} />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      <PagesHeader name="Staff Instruction" subName="SOPs & Guidelines" />

      <SearchBar searchText={searchText} onSearchChange={setSearchText} />

      <RoleFilter selectedRole={selectedRole} onSelectRole={setSelectedRole} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ResultsBar
        count={filtered.length}
        onClearFilters={() => {
          setSelectedCategory(null);
          setSearchText('');
        }}
        showClearButton={!!(selectedCategory || searchText)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map(sop => <SOPCard key={sop.id} item={sop} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(4.5),
    gap: wp(3),
  },
});

export default RestaurantInstructionsScreen;
