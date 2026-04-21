import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { NAV_ITEMS } from '../data';
import DrawerHeader from './DrawerHeader';
import DrawerItem from './DrawerItem';
import DrawerFooter from './DrawerFooter';
import { Colors, hp, wp } from '../../constants';

function CustomDrawerContent(props) {
  const { state, navigation } = props;
  const activeIdx = state.index;

  return (
    <View style={styles.drawerRoot}>
      <View style={styles.bgOverlay} />
      <DrawerHeader />
      <DrawerContentScrollView
        {...props}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionLabel}>NAVIGATION</Text>
        {NAV_ITEMS.map((item, idx) => (
          <DrawerItem
            key={item.name}
            item={item}
            isActive={idx === activeIdx}
            onPress={() => navigation.navigate(item.name)}
          />
        ))}
      </DrawerContentScrollView>
      <DrawerFooter navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  drawerRoot: {
    flex: 1,
    backgroundColor: Colors.drawerBg,
  },
  bgOverlay: {
    backgroundColor: Colors.drawerBg,
    opacity: 0.97,
  },
  scrollContent: {
    paddingVertical: hp(2.5),
    paddingBottom: hp(4),
  },
  sectionLabel: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: wp(0.625),
    paddingHorizontal: wp(8),
    paddingTop: hp(2),
    paddingBottom: hp(1.25),
    opacity: 0.7,
  },
});

export default CustomDrawerContent;
