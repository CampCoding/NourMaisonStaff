import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, hp, Icons, wp } from '../../../../constants';

interface Props {
  searchText: string;
  onSearchChange: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchText, onSearchChange }) => (
  <View style={styles.searchWrap}>
    {/* <Text style={styles.searchIcon}>🔍</Text> */}
    <Icons.Search height={wp(5)} width={wp(5)} color={Colors.textMuted} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search procedures..."
      placeholderTextColor={Colors.textMuted}
      value={searchText}
      onChangeText={onSearchChange}
      returnKeyType="search"
    />
    {searchText.length > 0 && (
      <TouchableOpacity onPress={() => onSearchChange('')}>
        <Text style={styles.searchClear}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: wp(5), // 20px
    marginTop: hp(1.75), // 14px
    marginBottom: hp(0.5), // 4px
    borderRadius: wp(3.5), // 14px
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: wp(3.5), // 14px
    paddingVertical: hp(0.5), // 4px
    gap: wp(2), // 8px
  },
  searchIcon: { fontSize: wp(3.75) }, // 15px
  searchInput: {
    flex: 1,
    fontSize: wp(3.5), // 14px
    color: Colors.text,
    paddingVertical: hp(1.25), // 10px
  },
  searchClear: {
    fontSize: wp(3.25), // 13px
    color: Colors.textMuted,
    fontWeight: '600',
    padding: wp(1), // 4px
  },
});

export default SearchBar;
