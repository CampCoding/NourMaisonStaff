import { createStackNavigator } from '@react-navigation/stack';
import ScreenNames from './ScreenNames';
import MyDrawer from './DrawerNav';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.BottomTabs}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenNames.BottomTabs} component={MyDrawer} />
    </Stack.Navigator>
  );
}
