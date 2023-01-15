import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {CustomHeading} from '../../components/small/MyUiComponents';
import AnimatedLottieView from 'lottie-react-native';
import * as assests from '../../assets/index';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-8 pt-0`}>
      <CustomHeading text="Profile" />
      <View style={tw`flex-1 items-center justify-center`}>
        <AnimatedLottieView
          style={{width: 150}}
          source={assests.PANDA}
          autoPlay
          loop
          // duration={100}
        />
        <Text>Your profile is awesome but invisible right now !</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
