import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import IdeaScreen from '../screens/IdeaScreen/IdeaScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import {Icon} from '@rneui/themed';
import {
  orange50,
  orange500,
} from 'react-native-paper/lib/typescript/styles/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {marginBottom: 4},
        })}>
        <Tab.Screen
          options={() => ({
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="home"
                  size={25}
                  color={focused ? 'orange' : 'black'}
                />
              );
            },
          })}
          name="Root"
          component={StackNavigator}
        />
        <Tab.Screen
          options={() => ({
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="schedule"
                  size={22}
                  color={focused ? 'orange' : 'black'}
                />
              );
            },
          })}
          name="History"
          component={HistoryScreen}
        />
        <Tab.Screen
          options={() => ({
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="lightbulb"
                  size={22}
                  color={focused ? 'orange' : 'black'}
                />
              );
            },
          })}
          name="Suggestions"
          component={IdeaScreen}
        />
        <Tab.Screen
          options={() => ({
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="dashboard"
                  size={22}
                  color={focused ? 'orange' : 'black'}
                />
              );
            },
          })}
          name="Profile"
          component={ProfileScreen}
        />
        <Tab.Screen
          options={() => ({
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="notifications"
                  size={22}
                  color={focused ? 'orange' : 'black'}
                />
              );
            },
          })}
          name="Alerts"
          component={NotificationScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({})