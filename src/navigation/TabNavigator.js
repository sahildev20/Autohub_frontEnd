import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Tab } from 'react-native-elements';
import StackNavigator from './StackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import IdeaScreen from '../screens/IdeaScreen/IdeaScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Home' component={StackNavigator} />
                <Tab.Screen name='History' component={HistoryScreen} />
                <Tab.Screen name='Suggestions' component={IdeaScreen} />
                <Tab.Screen name='Profile' component={ProfileScreen} />
                <Tab.Screen name='Alerts' component={NotificationScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;

const styles = StyleSheet.create({})