/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import React from 'react';


const Mybutton = ({ title }) => {
    return (<TouchableOpacity style={tw`mt-10 self-center w-200px bg-orange-500 rounded-full p-2`}>
        <Text style={tw`text-16px font-bold`}>{title}</Text>
    </TouchableOpacity>);
};
const MyUiComponents = ({ }) => {
    return (
        <View>
            <Text>MyUiComponents</Text>
        </View>
    );
};

const Item = ({ head, tail, icon }) => {
    return (
        <View style={tw`flex-row items-center mt-4`}>
            <Text style={tw`p-2 text-7 font-bold text-white bg-blue-500
             rounded-full `}>{icon}</Text>
            <View style={tw`pl-5`}>
                <Text style={tw`text-5 font-bold`}>{head}</Text>
                <Text style={tw`text-4 `}>{tail}</Text>
            </View>
        </View>
    );
};
export { Mybutton, Item };
export default MyUiComponents;


