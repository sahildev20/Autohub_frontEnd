import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'twrnc'
import { TextInput } from 'react-native';
import {CustomHeading, Mybutton} from '../../components/small/MyUiComponents';

const IdeaScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-8 pt-0 bg-white`}>
      <CustomHeading text="Sharing is Caring" />

      <View
        style={[tw`pl-3 shadow-sm mt-6 mb-6 h-40 text-16px`, {borderWidth: 1}]}>
        <TextInput
          style={tw`text-4`}
          multiline={true}
          placeholder="Tell me what you have in your mind ?"
        />
      </View>
      <Text style={tw`text-11px font-bold mt-10 self-center`}>
        Feel free to share any idea or suggestion, it will be appreciated.
      </Text>
      <Mybutton
        title="Send"
        width="100%"
        onPress={() => alert('Idea has been sent to Sahil')}
      />
    </SafeAreaView>
  );
};

export default IdeaScreen;

const styles = StyleSheet.create({});
