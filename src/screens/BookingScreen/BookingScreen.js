/* eslint-disable prettier/prettier */

import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Item, Mybutton } from '../../components/small/MyUiComponents';
import { useNavigation } from '@react-navigation/native';

const BookingScreen = ({ route }) => {
    const { autoid } = route.params;
    const navigation = useNavigation();

    return (

        <SafeAreaView style={tw`flex-1 p-8  `}>
            <Text style={tw`font-bold text-5`}>Successfull</Text>
            <View style={tw`h-50% bg-yellow-500 items-center justify-center`}>
                <Text style={tw`font-bold text-10`}> Booking Success! and autoid is : {autoid} </Text>
            </View>
            <View style={tw``}>
                <Item head="Arriving Time" tail="15 minutes" icon="A" />
                < Item head="Distance" tail="0.5 Meters" icon="B" />
                <Item head="Driver Rating" tail="*****" icon="C" />
            </View>
            <View style={[tw`flex-row flex-1 items-center`, { justifyContent: 'space-between', marginTop: 1 }]}>
                <Mybutton title='Cancel' onPress={() => alert('Are you sure you wanna cancel')} color='orange' />
                <Mybutton title='Track' onPress={() => navigation.navigate('trackRide')} color='orange' />
            </View>
        </SafeAreaView>

    );
};

export default BookingScreen;

const styles = StyleSheet.create({
});
