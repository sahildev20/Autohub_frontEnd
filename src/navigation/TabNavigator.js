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
import Screen from '../screens/mewat/Screen';
import {color} from '@rneui/base';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          headerTitleStyle: {fontSize: 25, fontWeight: 'bold', marginLeft: 10},
          tabBarActiveTintColor: '#FF7043',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {marginBottom: 4},
        })}>
        <Tab.Screen
          options={() => ({
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="home"
                  size={25}
                  color={focused ? '#FF7043' : 'black'}
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
                  color={focused ? '#FF7043' : 'black'}
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
                  color={focused ? '#FF7043' : 'black'}
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
                  color={focused ? '#FF7043' : 'black'}
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
                  color={focused ? '#FF7043' : 'black'}
                />
              );
            },
          })}
          name="Mec"
          component={Screen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({})