import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import { Colors } from './src/constants';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    // <Provider store={store}>
    // <PersistGate loading={null} persistor={persistor}>
    <SafeAreaProvider>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
    // </PersistGate>
    // </Provider>
  );
}

export default App;
