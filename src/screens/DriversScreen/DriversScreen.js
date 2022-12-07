/* eslint-disable prettier/prettier */
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Avatar} from '@rneui/themed';


const DATA = [
    { id: '1', name: 'BPX-2611', distance: '5 kms', ratings: 5 },
    { id: '2', name: 'BPX-8198', distance: '10 kms', ratings: 5 },
    { id: '3', name: 'BPX-5536', distance: '15 kms', ratings: 5 },
    { id: '4', name: 'BPX-5536', distance: '15 kms', ratings: 4 },
    { id: '5', name: 'BPX-5536', distance: '15 kms', ratings: 4 },
    { id: '6', name: 'BPX-5536', distance: '15 kms', ratings: 4 },
];
const Driver = ({ item }) => {
    return (
        <TouchableOpacity style={tw`flex-row p-8 items-center`}>
            <Avatar style={tw`w-60px h-60px bg-blue-400 rounded-full mr-6`} />
            <View>
                <Text style={tw`text-20px font-400 mb-2`}>{item.name}</Text>
                <Text>Ratings : {item.ratings}</Text>
            </View>
        </TouchableOpacity>
    );
};
const DriversScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 `} >
            <Text style={tw`text-6 pl-8 mt-10  font-bold`}>Available Auto</Text>
            <TextInput placeholder='Search by Auto number or Driver name'
                style={[tw`m-4 pl-10 rounded-full`, { borderWidth: 2, borderColor: 'gray' }]} />
            <View>
                <FlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={tw`h-1px bg-orange-300`}></View>}
                    renderItem={({ item }) => <Driver item={item} />
                    }
                    ListFooterComponent={() =>
                        <View style={tw`h-50 pl-8`} >
                            <Text style={tw`text-red-900 self-center`}>Opps ! Looks like you have reach the end</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default DriversScreen;

const styles = StyleSheet.create({});
