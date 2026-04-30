import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './../screens/DrawarScreens/HomeScreen/index';
import { Colors } from '../constants';
import { NAV_ITEMS } from './data';
import CustomDrawerContent from './comopnents/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
          backgroundColor: Colors.bg,
          shadowColor: Colors.primary,
          shadowOpacity: 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 4, height: 0 },
          elevation: 8,
        },
        overlayColor: 'rgba(44,34,24,0.45)',
        drawerType: 'slide',
        swipeEdgeWidth: 60,
      }}
    >
      {NAV_ITEMS.map(item => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.label,
            headerStyle: {
              backgroundColor: Colors.bg,
              shadowColor: Colors.primary,
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            },
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
