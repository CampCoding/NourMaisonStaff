import { createStackNavigator } from '@react-navigation/stack';
import ScreenNames from './ScreenNames';
import MyDrawer from './DrawerNav';
import InstructionDetailScreen from './../screens/OtherScreens/InstructionDetailScreen/index';
import VideoDisplayScreen from '../screens/OtherScreens/VideoDisplayScreen';
import LoginPageScreen from '../screens/AuthScreens/LoginPageScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.LoginPageScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenNames.DrawerTabs} component={MyDrawer} />
      <Stack.Screen
        name={ScreenNames.LoginPageScreen}
        component={LoginPageScreen}
      />
      <Stack.Screen
        name={ScreenNames.InstructionDetailScreen}
        component={InstructionDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.VideoDisplayScreen}
        component={VideoDisplayScreen}
      />
    </Stack.Navigator>
  );
}
