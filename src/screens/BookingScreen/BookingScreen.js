import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import tw from 'twrnc';
import {Item} from '../../components/small/MyUiComponents';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  selectDropAddress,
  selectPickupAddress,
  selectRideInformation,
} from '../../slices/navSlice';
import Loading from '../../components/Loading';
import AnimatedLottieView from 'lottie-react-native';
import * as assets from '../../assets/index';
import {MY_BACKEND_URL} from '@env';
import {Button} from '@rneui/base';

const BookingScreen = ({route}) => {
  const {driverId, rideType} = route.params;
  const [loaded, setLoaded] = useState(false);
  const [ride, setRide] = useState(null);
  const rideInformation = useSelector(selectRideInformation);
  const pickupCoordinates = useSelector(selectPickupAddress);
  const dropCoordinates = useSelector(selectDropAddress);
  const distance = Math.round(rideInformation[0] / 1000);
  const time = Math.round(rideInformation[1] / 60);
  const navigation = useNavigation();

  async function bookRide() {
    try {
      const res = await axios.post(
        `${MY_BACKEND_URL}/bookRide`,
        {
          location: 'default',
          latitude: pickupCoordinates[1],
          longitude: pickupCoordinates[0],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`your shared ride response is : ${res}`);
    } catch (error) {}
  }
  async function bookAuto() {
    try {
      const res = await axios.post(
        `${MY_BACKEND_URL}/bookAuto`,
        {
          driverId,
          userId,
          rideType: 'personal',
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        console.log(`your personal ride response is : ${res}`);
        setLoaded(true);
      }
    } catch (error) {
      console.log(`your personal ride error is : ${error}`);
      setLoaded(true);
    }
  }
  useEffect(() => {
    if (rideType == 'shared') {
      bookRide();
    } else {
      bookAuto();
    }
  }, []);

  //loading untill we find a driver , after that we will return the below safe area view
  return loaded ? (
    <SafeAreaView style={tw`flex-1 bg-white p-8  `}>
      <View style={tw` items-center mb-4`}>
        <AnimatedLottieView
          style={{width: 250}}
          source={assets.SUCCESS_BLUE}
          autoPlay
          speed={0.6}
          loop={true}
        />
      </View>
      <Text style={tw`font-bold text-5 mb-8 text-purple-900 text-center`}>
        Booking Successful.
      </Text>
      <View style={tw``}>
        <Text style={tw`text-4 text-black font-bold`}>Ride Details</Text>
        <Item head="Arriving Time" tail={`${time} Minutes`} icon="A" />
        <Item head="Distance" tail={`${distance} KMS`} icon="B" />
      </View>
      <View
        style={[
          tw`flex-row flex-1 items-center`,
          {justifyContent: 'space-between', marginTop: 1},
        ]}>
        <Button
          title="Cancel"
          onPress={() => alert('Are you sure you wanna cancel')}
        />
        <Button
          title="Track"
          onPress={() => navigation.navigate('trackRide')}
        />
      </View>
      <Text style={tw`text-12-px text-center`}>
        Please wait at your location, you will get your ride soon.
      </Text>
    </SafeAreaView>
  ) : (
    <Loading />
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
