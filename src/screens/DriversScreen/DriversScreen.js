/* eslint-disable prettier/prettier */
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Avatar } from 'react-native-elements';


const DATA = [
    { id: '1', name: 'BPX-2611', distance: '5 kms', ratings: 5 },
    { id: '2', name: 'BPX-8198', distance: '10 kms', ratings: 5 },
    { id: '3', name: 'BPX-5536', distance: '15 kms', ratings: 5 },
    { id: '4', name: 'BPX-5536', distance: '15 kms', ratings: 4 },
    { id: '5', name: 'BPX-5536', distance: '15 kms', ratings: 5 },
    { id: '6', name: 'BPX-5536', distance: '15 kms', ratings: 5 },
    { id: '7', name: 'BPX-5536', distance: '15 kms', ratings: 4 },
    { id: '8', name: 'BPX-5536', distance: '15 kms', ratings: 2 },
    { id: '9', name: 'BPX-5536', distance: '15 kms', ratings: 3 },
    { id: '11', name: 'BPX-5536', distance: '15 kms', ratings: 5 },
    { id: '12', name: 'BPX-5536', distance: '15 kms', ratings: 4 },
    { id: '31', name: 'BPX-5536', distance: '15 kms', ratings: 3 },
    { id: '32', name: 'BPX-5536', distance: '15 kms', ratings: 4 },

];
const Driver = ({ item }) => {
    return (
        <TouchableOpacity style={tw`flex-row bg-gray-300 p-8`}>
            <Avatar style={tw`w-100px h-100px bg-blue-400`} ><Text>A</Text></Avatar>
            <Text style={tw`mr-10 ml-5 text-7 font-bold text-white bg-blue-500 rounded-full`}>A</Text>
            <View>
                <Text style={tw`text-20px font-400 mb-2`}>{item.name}</Text>
                <Text style={tw`text-16px`}>Distance : {item.distance}</Text>
                <Text>Ratings : {item.ratings}</Text>
            </View>
        </TouchableOpacity>
    );
};
const DriversScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 `} >
            <View style={tw` overflow-scroll shadow-lg`}>
                <Text style={tw`text-12 p-5 `}>Available Auto</Text>
            </View>

            <View>
                <FlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={tw`h-1px bg-gray-600`}></View>}
                    renderItem={({ item }) => <Driver item={item} />
                    } />
            </View>
        </SafeAreaView>
    );
};

export default DriversScreen;

const styles = StyleSheet.create({});
