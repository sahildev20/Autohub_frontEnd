/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import UserLocation from '../../components/UserLocation';

import tw from 'twrnc';
const condition = true;
const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      {condition === true ? (
        <UserLocation />
      ) : (
        <ImageBackground
          style={styles.homeimage}
          source={require('./assets/maps.png')}>
          <View style={styles.root}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Current Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Destination</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeimage: {flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end'},
  root: {
    height: 200,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 5,
    borderTopColor: 'orange',
  },
  text: {fontSize: 16, fontWeight: '600', color: '#000000'},
  button: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 10,
    width: '95%',
    marginBottom: 10,
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
    shadowColor: '#171717',
    shadowOpacity: 0.3,
    elevation: 10,
  },
});

export default HomeScreen;
