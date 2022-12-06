import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const TrackRideScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
            <Text>
                Here i will track the auto with respect to the user!
            </Text>
        </SafeAreaView>
    )
}

export default TrackRideScreen