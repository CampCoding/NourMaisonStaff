import { createStackNavigator } from '@react-navigation/stack';
import ScreenNames from './ScreenNames';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.BottomTabs}
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name={ScreenNames.SplashScreen} component={SplashScreen} /> */}
      {/* <Stack.Screen name={ScreenNames.AuthStack} component={AuthStack} /> */}
      <Stack.Screen name={ScreenNames.BottomTabs} component={BottomTabs} />
    </Stack.Navigator>
  );
}
