/* eslint-disable prettier/prettier */

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


const UserLocation = () => {
  const navigation = useNavigation();
  const imageUri =
    'https://firebasestorage.googleapis.com/v0/b/autometa-2611.appspot.com/o/rickshaw.png?alt=media&token=c2e4e093-1d67-43a9-9a97-e02767c843f6';
  return (
    <View style={tw`bg-red-100 flex-1 items-center p-10 pt-20`}>
      <View>
        <Image
          style={styles.sticker}
          source={{
            uri: imageUri,
          }}
        />
        <Text style={tw`text-center font-bold text-7 pt-10`}>First thigs first !</Text>
        <Text style={tw`text-center font-bold text-4 pt-3`}>Where you are ?</Text>

      </View>
      <View style={tw`flex-1 justify-end`}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}  style={tw`items-center p-3 mb-5`}>

          <Text style={tw`text-red-500`}>Enter Manually</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`items-center bg-orange-500 rounded-full p-3 w-80 `}>
          <Text>Enable Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserLocation;

const styles = StyleSheet.create({
  sticker: { width: 250, height: 250, resizeMode: 'cover' },
});
