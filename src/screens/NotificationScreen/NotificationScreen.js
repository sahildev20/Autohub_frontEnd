import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import {Icon} from '@rneui/base';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
      <Text>Autohub got some good news only for you !</Text>
      <Icon name="home" size={30} />
    </SafeAreaView>
  );
};

export default NotificationScreen