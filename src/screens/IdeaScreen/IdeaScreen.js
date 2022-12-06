import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'twrnc'
import { TextInput } from 'react-native';
import { Mybutton } from '../../components/small/MyUiComponents'

const IdeaScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 p-8 bg-white`}>
            <Text style={tw`text-7  text-black`}>I have an IDEA !...</Text>
            <View style={[tw`p-4 shadow-sm mt-6 mb-6`, { borderWidth: 2 }]}>
                <TextInput
                    style={tw`text-4`}
                    multiline={true}
                    placeholder='Tell me what is in your mind ?'
                />
            </View>
            <Text>
                If you have any idea or any suggestion feel free to share it. It will be appreciated.
            </Text>
            <Mybutton title='Send' onPress={() => alert('Idea has been sent to Sahil')} />
        </SafeAreaView>
    );
}

export default IdeaScreen;

const styles = StyleSheet.create({});
