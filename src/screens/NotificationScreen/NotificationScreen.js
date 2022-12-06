import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'


const NotificationScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
      <Text>
        Autohub got some good news only for you !
      </Text>
    </SafeAreaView>
  )
}

export default NotificationScreen