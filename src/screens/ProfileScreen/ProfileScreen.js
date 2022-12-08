import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';
import tw from 'twrnc'
import {CustomHeading} from '../../components/small/MyUiComponents';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-8 pt-0`}>
      <CustomHeading text="Profile" />
      <View style={tw`flex-1 items-center justify-center`}>
        <Text>your profile is awesome but invisible right now !</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
