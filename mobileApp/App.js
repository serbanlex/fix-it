import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home/HomeScreen';

import { NativeBaseProvider } from 'native-base';
import MainNavigator from './src/navigation/MainNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={MainNavigator} options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
