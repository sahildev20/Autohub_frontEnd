import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';
import tw from 'twrnc'


const ProfileScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
            <Text>
                Here you will get everything about you !
            </Text>
        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({});
