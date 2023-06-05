import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'twrnc'
import { TextInput } from 'react-native';
import {CustomHeading, Mybutton} from '../../components/small/MyUiComponents';
import {BUTTON_COLOR} from '../../assets';

const IdeaScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-4 pt-0 bg-indigo-100`}>
      <Text style={tw`text-5 text-black mt-3`}>
        Help us so we can give you back !
      </Text>
      <View
        style={[
          tw`pl-3  mt-6 mb-6 h-90 bg-white rounded`,
          {borderWidth: 1, borderColor: 'indigo'},
        ]}>
        <TextInput
          style={tw`text-4`}
          multiline={true}
          placeholder="Tell us what you have in your mind ..."
        />
      </View>
      <Text style={tw`text-11px font-bold mt-10 self-center`}>
        Feel free to share any idea or suggestion, it will be appreciated.
      </Text>
      <Mybutton
        title="Send"
        width="100%"
        onPress={() => alert('Idea has been sent to Sahil')}
        color={BUTTON_COLOR}
      />
    </SafeAreaView>
  );
};

export default IdeaScreen;

const styles = StyleSheet.create({});
