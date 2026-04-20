import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import ScreenNames from './ScreenNames';
import { hp, wp, Colors, Fonts } from '../constants';
import { useCallback, useMemo } from 'react';
import { BottomTabsData } from './data';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const TabBarBackground = useCallback(
    () => (
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: Colors.white }]}
      />
    ),
    [],
  );

  const TabBarIcon = useCallback(({ color, size, focused, tab }) => {
    const Icon = tab.icon;

    return (
      <Icon
        width={focused ? size * 1.4 : size * 1.2}
        height={focused ? size * 1.4 : size * 1.2}
        fill={color}
        style={{
          transform: [{ scale: focused ? 1.1 : 1 }],
        }}
      />
    );
  }, []);

  const screenOptions = useMemo(
    () => ({
      tabBarStyle: TabsStyle.tabBarStyle,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.text,
      tabBarLabelStyle: TabsStyle.tabBarLabelStyle,
      tabBarItemStyle: TabsStyle.tabBarItemStyle,
      headerShown: false,
      tabBarShowLabel: true,
      freezeOnBlur: true,
      tabBarHideOnKeyboard: true,
      tabBarBackground: TabBarBackground,
      lazy: true,
    }),
    [TabBarBackground],
  );
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HomeScreen}
      screenOptions={screenOptions}
      detachInactiveScreens={false}
    >
      {BottomTabsData?.map(tab => {
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size, focused }) =>
                TabBarIcon({ color, size, focused, tab }),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default BottomTabs;

const TabsStyle = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: hp('9%'),
    paddingBottom: hp('1.5%'),
    paddingTop: hp('1%'),
    paddingHorizontal: wp('4%'),
    // borderTopRightRadius: hp('3%'),
    // borderTopLeftRadius: hp('3%'),
    elevation: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: hp(0.8) },
    shadowOpacity: 0.28,
    shadowRadius: wp(3.5),
    marginHorizontal: 0,
    overflow: 'hidden',
  },

  tabBarLabelStyle: {
    fontSize: wp('2.8'),
    letterSpacing: 0.3,
    marginTop: 4,
    textTransform: 'capitalize',
    fontFamily: Fonts.Bold,
  },

  tabBarItemStyle: {
    borderRadius: 16,
    marginHorizontal: 4,
  },
});
