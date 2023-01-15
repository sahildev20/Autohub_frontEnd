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
const Mybutton = ({title, onPress, style, color = '#FF8A65', width = 300}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`mt-4 bg-${color} rounded-full p-2 self-center`,
        {width: width},
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
    <View style={tw`flex-row items-center mt-2 p-2 bg--100`}>
      <Avatar style={tw`h-20-px w-20-px rounded-full bg-blue-100 mr-4`} />
      <Text style={tw`text-4 text-black`}>{head}</Text>
      <View style={tw`pl-5 `}>
        <Text style={tw`text-4 font-bold text-black`}>{tail}</Text>
      </View>
    </View>
  );
};
export {Mybutton, Item, CustomHeading};
export default MyUiComponents;


