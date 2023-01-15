import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import {LOGO_SMALL} from '../assets';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setUser} from '../slices/navSlice';
import {retrieveJWTUser} from '../components/constants/constants';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const dispatch = useDispatch();
  let user = useSelector(selectUser);

  const getLogin = async user => {
    if (user == true || user == false) {
      const cred = await retrieveJWTUser();
      if (!cred) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  };
  React.useEffect(() => {
    getLogin(user);
  }, [user]);

  // const checkIfLoggedIn = async () => {
  //   const value = await AsyncStorage.getItem('isLoggedIn');
  //   if (value === 'true') {
  //     setIsLoggedIn(true);
  //     dispatch(setUser(true));
  //   } else {
  //     setIsLoggedIn(false);
  //     dispatch(setUser(false));
  //   }
  // };

  if (isLoggedIn == true) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerTitle: props => {
              return (
                <Image
                  style={{width: 120, marginTop: 4, resizeMode: 'contain'}}
                  source={LOGO_SMALL}
                />
              );
            },
            headerShown: true,
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
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="loginnn" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default TabNavigator;

const styles = StyleSheet.create({});
