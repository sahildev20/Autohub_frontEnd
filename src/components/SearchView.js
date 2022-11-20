/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const SearchView = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`flex-1 p-5 items-center `}>
            <View style={styles.textInput}><TextInput placeholder="Search a place"  /></View>
            <Text style={tw`text-6 p-3 mt-20`}>We will set up search view here where user can search for different location.</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={tw`rounded-full p-3 bg-orange-500 mt-5`}><Text>Ahh ! You can go back</Text></TouchableOpacity>
        </SafeAreaView>
    );
};

export default SearchView;

const styles = StyleSheet.create({
    textInput:{ borderRadius:20,backgroundColor:'white' , paddingLeft:10 ,width:'95%',
position:'absolute', top:20},
});
