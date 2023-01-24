/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setEmptyLocation, setPickupAddress} from '../slices/navSlice';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import {Mybutton} from './small/MyUiComponents';
import * as assets from '../assets';

const UserLocation = ({route}) => {
  //Getting values from slice using selector
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const requestLocationPermission = async () => {
    //In ios it is being done automatically

    if (Platform.OS === 'ios') {
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'AutoHub needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted

          subscribeLocationLocation();
        } else {
        }
      } catch (err) {
        console.warn(err);
      }

      //We need to ask for location permissions on android
    }
  };

  const subscribeLocationLocation = async () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        // getting longitude from location
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const cordinates = [currentLongitude, currentLatitude];
        try {
          dispatch(setPickupAddress(cordinates));
          dispatch(setEmptyLocation(false));
        } catch (error) {
          console.log(error);
        }
      },
      error => {},
      {
        enableHighAccuracy: true,
        distanceFilter: 50,
        maximumAge: 2000,
      },
    );
  };

  return (
    <View style={tw`bg-white flex-1 items-center p-10 pt-20`}>
      <View style={tw`items-center`}>
        <Image
          style={styles.sticker}
          source={{
            uri: assets.AUTO_IMAGE,
          }}
        />
        <Text style={tw`font-bold text-4 pt-10 text-black`}>
          Your Location is required to get you a ride
        </Text>
        {/* <Text style={tw`text-center font-bold text-4 pt-3 text-black`}>
          Where you are ?
        </Text> */}
      </View>
      <View style={tw`flex-1 justify-end`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', {isPickup: true})}
          style={tw`items-center p-3 mb-3`}>
          <Text style={tw`text-red-400 text-4 tracking-widest`}>
            Enter Manually
          </Text>
        </TouchableOpacity>
        <Mybutton
          title="Enable Location"
          width={300}
          onPress={() => requestLocationPermission()}
          color={assets.BUTTON_COLOR}
        />
      </View>
    </View>
  );
};
export default UserLocation;

const styles = StyleSheet.create({
  sticker: {width: 200, height: 200, resizeMode: 'cover'},
});
