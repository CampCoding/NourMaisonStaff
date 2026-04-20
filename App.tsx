import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    // <Provider store={store}>
    // <PersistGate loading={null} persistor={persistor}>
    <SafeAreaProvider>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <StatusBar backgroundColor={'white'} barStyle={'light-content'} />

      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
    // </PersistGate>
    // </Provider>
  );
}

export default App;
