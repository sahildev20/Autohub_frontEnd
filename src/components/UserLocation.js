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
import {
  setEmptyLocation,
  setPickupAddress,
  setPickupPlace,
} from '../slices/navSlice';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

const UserLocation = ({route}) => {
  //Getting values from slice using selector
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //To run on app lauch we use useeffect hook
  React.useEffect(() => {
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
              message: 'This App needs to Access your location',
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
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const subscribeLocationLocation = async () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        // getting longitude from location
        const currentLongitude = JSON.stringify(position.coords.longitude);
        console.log('longitude :', currentLongitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log('latitude :', currentLatitude);
        const cordinates = [currentLongitude, currentLatitude];
        try {
          dispatch(setPickupAddress(cordinates));
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

  const imageUri =
    'https://firebasestorage.googleapis.com/v0/b/autometa-2611.appspot.com/o/rickshaw.png?alt=media&token=c2e4e093-1d67-43a9-9a97-e02767c843f6';
  return (
    <View style={tw`bg-white flex-1 items-center p-10 pt-30`}>
      <View>
        <Image
          style={styles.sticker}
          source={{
            uri: imageUri,
          }}
        />
        <Text style={tw`text-center font-bold text-7 pt-10 text-black`}>
          First thing first !
        </Text>
        <Text style={tw`text-center font-bold text-4 pt-3 text-black`}>
          Where you are ?
        </Text>
      </View>
      <View style={tw`flex-1 justify-end`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', {target: 'pickup'})}
          style={tw`items-center p-3 mb-5`}>
          <Text style={tw`text-red-500`}>Enter Manually</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            dispatch(setEmptyLocation(0), setPickupPlace('Mumbai'))
          }
          style={tw`items-center bg-orange-500 rounded-2 p-3 w-90 `}>
          <Text style={tw`text-18px`}>Enable Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserLocation;

const styles = StyleSheet.create({
  sticker: {width: 200, height: 200, resizeMode: 'contain'},
});
