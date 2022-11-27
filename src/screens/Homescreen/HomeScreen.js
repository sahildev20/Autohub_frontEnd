/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet, Button,
  Platform, PermissionsAndroid,
} from 'react-native';
import UserLocation from '../../components/UserLocation';
import tw from 'twrnc';
import MapComponent from '../../components/MapComponent';
import { useDispatch, useSelector } from 'react-redux';
import { selectDropAddress, selectPickupAddress, setPickupAddress } from '../../slices/navSlice';
import Geolocation from 'react-native-geolocation-service';


const HomeScreen = ({ route, navigation }) => {
  //Getting values from slice using selector
  const pickupAddress = useSelector(selectPickupAddress);
  const dropAddress = useSelector(selectDropAddress);
  const dispatch = useDispatch();

  //To run on app lauch we use useeffect hook
  React.useEffect(() => {
    const requestLocationPermission = async () => {
      //In ios it is being done automatically
      if (Platform.OS === 'ios') {

        subscribeLocationLocation();
      } else {
        //We need to ask for location permissions on android
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
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);


  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        // getting longitude from location
        const currentLongitude = JSON.stringify(position.coords.longitude);
        console.log(currentLongitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log(currentLatitude)
        const cordinates = [currentLongitude, currentLatitude];
        dispatch(setPickupAddress(cordinates));

      },
      (error) => {
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <SafeAreaView style={styles.homecontainer}>

      {!pickupAddress == null ? (
        <UserLocation />
      ) : (
          <View style={styles.homecontainer}>
            <View style={styles.homecontainer}>
              <MapComponent style={{ flex: 1 }} />
            </View>
          <View style={styles.root}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Current Location{pickupAddress}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Destination{dropAddress}</Text>
            </TouchableOpacity>
              <View >
                <Button style={tw`p-5`} title="Book Now"
                  onPress={() => navigation.navigate('Booking')} />

              </View>
          </View>
          </View>


      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homecontainer: { flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end' },
  root: {
    height: 200,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 5,
    borderTopColor: 'orange',
  },
  text: { fontSize: 16, fontWeight: '600', color: '#000000' },
  button: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 10,
    width: '95%',
    marginBottom: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 3,
    shadowColor: '#171717',
    shadowOpacity: 0.3,
    elevation: 10,
  },
});

export default HomeScreen;
