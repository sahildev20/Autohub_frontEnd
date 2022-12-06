import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import IdeaScreen from '../screens/IdeaScreen/IdeaScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen
                    options={() => ({
                        tabBarIcon: () => {
                            return <Icon type='fontawesome' name='home' size={20} />
                        },
                    })}
                    name='Root' component={StackNavigator} />
                <Tab.Screen
                    options={() => ({
                        tabBarIcon: () => {
                            return <Icon type='fontawesome' name='home' size={20} />
                        },
                    })}
                    name='History' component={HistoryScreen} />
                <Tab.Screen
                    options={() => ({
                        tabBarIcon: () => {
                            return <Icon type='fontawesome' name='home' size={20} />
                        },
                    })}
                    name='Suggestions' component={IdeaScreen} />
                <Tab.Screen
                    options={() => ({
                        tabBarIcon: () => {
                            return <Icon type='fontawesome' name='home' size={20} />
                        },
                    })}
                    name='Profile' component={ProfileScreen} />
                <Tab.Screen
                    options={() => ({
                        tabBarIcon: () => {
                            return <Icon type='fontawesome' name='home' size={20} />
                        },
                    })} name='Alerts' component={NotificationScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;

const styles = StyleSheet.create({})