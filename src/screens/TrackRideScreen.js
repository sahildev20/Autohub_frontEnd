import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import AnimatedLottieView from 'lottie-react-native';

const TrackRideScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
      <AnimatedLottieView
        style={{width: 150}}
        source={require('../assets/130334-sweet-run-cycle.json')}
        autoPlay
        loop
        // duration={100}
      />
      <Text>Here i will track the auto with respect to the user!</Text>
    </SafeAreaView>
  );
};

export default TrackRideScreen