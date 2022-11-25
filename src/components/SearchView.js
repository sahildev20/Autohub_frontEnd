/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY, Hello_w } from "@env";


const SearchView = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`flex-1 p-5`}>

            <GooglePlacesAutocomplete
                placeholder='Search your place '

                debounce={400}
                query={{
                    key: MAPS_API_KEY,
                    language: 'en', // language of the results
                }} />
            <Text style={tw`text-6 p-3 mt-20`}>  {MAPS_API_KEY}We will set up search view here where user can search for different location.</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={tw`rounded-full p-3 bg-orange-500 mt-5`}><Text>Ahh ! You can go back</Text></TouchableOpacity>
        </SafeAreaView>
    );
};

export default SearchView;

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 20,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 10, width: '95%',
        position: 'absolute', top: 20
    },
});
