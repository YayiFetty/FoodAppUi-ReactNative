import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';
import { registerRootComponent } from 'expo';

function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <RootNavigation />
      </View>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);