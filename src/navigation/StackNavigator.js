import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SearchView from '../components/SearchView';
import BookingScreen from '../screens/BookingScreen/BookingScreen.js';
import DriversScreen from '../screens/DriversScreen/DriversScreen.js';
import HomeScreen from '../screens/Homescreen/HomeScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import AvailableAutos from '../components/AvailableAutos';
import TrackRideScreen from '../screens/TrackRideScreen';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#E8EAF6',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTitle: 'AUTOHUB',
          }}
        />
        <Stack.Screen name="Search" component={SearchView} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Drivers" component={DriversScreen} />
        <Stack.Screen name="Register" component={LoginScreen} />
        <Stack.Screen name="selectAuto" component={AvailableAutos} />
        <Stack.Screen name="trackRide" component={TrackRideScreen} />
      </Stack.Navigator>
    );
}

export default StackNavigator

const styles = StyleSheet.create({})