/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Homescreen/HomeScreen.js';
import NotificationScreen from './src/screens/NotificationScreen/NotificationScreen.js';
import {Provider} from 'react-redux';
import store from './src/store.js';
import SearchView from './src/components/SearchView.js';
import BookingScreen from './src/screens/BookingScreen/BookingScreen.js';
import DriversScreen from './src/screens/DriversScreen/DriversScreen.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchView} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Drivers" component={DriversScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
