/* eslint-disable prettier/prettier */

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import tw from 'twrnc';
import {Item, Mybutton} from '../../components/small/MyUiComponents';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  selectPickupAddress,
  selectRideInformation,
} from '../../slices/navSlice';
import Loading from '../../components/Loading';
import AnimatedLottieView from 'lottie-react-native';
import * as assets from '../../assets/index';

const BookingScreen = ({route}) => {
  const {autoid} = route.params;
  const [loading, setLoading] = React.useState(true);
  const [nearestAuto, setNearestAuto] = React.useState(null);

  const rideInformation = useSelector(selectRideInformation);
  const pickupCoordinates = useSelector(selectPickupAddress);
  const distance = Math.round(rideInformation[0] / 1000);
  const time = Math.round(rideInformation[1] / 60);
  const navigation = useNavigation();

  async function getNearestAuto() {
    //fetch nearest driver from server

    axios
      .post(
        'http://192.168.58.77:3000/findAuto',
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
      )
      .then(response => {
        console.log('data :', response.data.nearestDriver);
        setNearestAuto(response.data.nearestDriver);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }
  React.useEffect(() => {
    getNearestAuto();
  }, []);

  //loading untill we find a driver , after that we will return the below safe area view
  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={tw`flex-1 p-8  `}>
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
        <Item head="Vehicle Number" tail={nearestAuto.vehicleNumber} icon="C" />
        <Item head="Sitting Capacity" tail={nearestAuto.seats} icon="C" />
        <Item head="Arriving Time" tail={`${time} Minutes`} icon="A" />
        <Item head="Distance" tail={`${distance} KMS`} icon="B" />
      </View>
      <View
        style={[
          tw`flex-row flex-1 items-center`,
          {justifyContent: 'space-between', marginTop: 1},
        ]}>
        <Mybutton
          width={150}
          title="Cancel"
          onPress={() => alert('Are you sure you wanna cancel')}
          color={assets.BUTTON_COLOR}
        />
        <Mybutton
          title="Track"
          width={150}
          onPress={() => navigation.navigate('trackRide')}
          color={assets.BUTTON_COLOR}
        />
      </View>
      <Text style={tw`text-12-px text-center`}>
        Please wait at your location, you will get your ride soon.
      </Text>
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
