import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import tw from 'twrnc';
const Loading = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <AnimatedLottieView
        style={{width: 150}}
        source={require('../assets/99833-edupia-loading.json')}
        autoPlay
        loop
        // duration={100}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
