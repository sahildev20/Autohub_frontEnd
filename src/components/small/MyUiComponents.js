/* eslint-disable prettier/prettier */
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import {Avatar} from '@rneui/themed';

function CustomHeading({text, icon = null, style}) {
  return (
    <Text style={[tw`text-7 mt-8 text-black font-bold`, style]}>{text}</Text>
  );
}
const Mybutton = ({title, onPress, style, color = 'orange', width = 100}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`mt-4 bg-orange-500 rounded-full p-2`,
        {backgroundColor: color, width: width},
        style,
      ]}>
      <Text style={tw`text-16px font-bold self-center`}>{title}</Text>
    </TouchableOpacity>
  );
};
const MyUiComponents = ({}) => {
  return (
    <View>
      <Text>MyUiComponents</Text>
    </View>
  );
};

const Item = ({head, tail, icon}) => {
  return (
    <View style={tw`flex-row items-center mt-4`}>
      <Avatar style={tw`h-40px w-40px rounded-full bg-orange-300`} />

      <View style={tw`pl-5`}>
        <Text style={tw`text-5 font-bold`}>{head}</Text>
        <Text style={tw`text-4 `}>{tail}</Text>
      </View>
    </View>
  );
};
export {Mybutton, Item, CustomHeading};
export default MyUiComponents;


