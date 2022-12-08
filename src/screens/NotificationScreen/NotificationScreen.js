import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import {Icon} from '@rneui/base';
import {CustomHeading} from '../../components/small/MyUiComponents';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-8 pt-0`}>
      <CustomHeading text="Notifications" />
      <View style={tw`flex-1 items-center justify-center`}>
        <Text>You have no notifications right now !</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen