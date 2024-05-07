/* eslint-disable react-hooks/rules-of-hooks */
/**
 *
 * @format
 * @flow strict-local
 */
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import type {FC} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Introduction from './src/screens/Introduction';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';

const Stack = createNativeStackNavigator<any>();
const app: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="Introduction"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Introduction" component={Introduction} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default app;
