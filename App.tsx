import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { useStore } from './src/store';
import Navigation from './src/navigation';

// Enable native screens for better performance
enableScreens();

export default function App() {
  const initialize = useStore(state => state.initialize);
  const isInitialized = useStore(state => state.isInitialized);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
