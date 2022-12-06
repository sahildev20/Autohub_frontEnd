import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'twrnc'

const LoginScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
            <Text>
                You identity is important to us !
            </Text>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({});

