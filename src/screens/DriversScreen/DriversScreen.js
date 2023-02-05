/* eslint-disable prettier/prettier */
import {FlatList, SafeAreaView, Text, View} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import tw from 'twrnc';
import axios from 'axios';
import {MY_BACKEND_URL} from '@env';
import {useSelector} from 'react-redux';
import {selectPickupAddress, selectDropAddress} from '../../slices/navSlice';
import Loading from '../../components/Loading';

import Driver from '../../components/small/Driver';

const DriversScreen = ({route}) => {
  const {rideType} = route.params;
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const pickupCoordinates = useSelector(selectPickupAddress);
  const dropCoordinates = useSelector(selectDropAddress);
  const message = useRef('');

  async function getAvailableDrivers() {
    try {
      const response = await axios.post(
        `${MY_BACKEND_URL}/driver/getAvailableDrivers`,
        {
          pickupCoordinates: pickupCoordinates,
          dropCoordinates: dropCoordinates,
          rideType: rideType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response) {
        const availableDrivers = response.data;
        setData(availableDrivers);
        return setLoaded(true);
      }
    } catch (error) {
      if (error.response && error.response.status == 404) {
        message.current = `No online drivers found at the moment`;
      } else {
        message.current = `Something went wrong please try again later .`;
      }
      setData([]);
      return setLoaded(true);
    }
  }

  //fetch nearest driver from server
  useEffect(() => {
    getAvailableDrivers();
  }, []);

  //main screen return
  if (loaded !== true) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
        <Text style={tw`text-6 pl-8 mt-6 text-black font-bold`}>
          Available Drivers
        </Text>
        <Text style={tw`text-3 pl-8 pb-4 mt-4 `}>
          Please select an auto and confirm booking.
        </Text>
        <View style={tw``}>
          {data !== [] && (
            <FlatList
              data={data}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View
                  style={tw`h-6-px bg-[#E64A19] w-20 self-center rounded-full`}></View>
              )}
              renderItem={({item}) => <Driver item={item} rideType />}
              ListFooterComponent={() => (
                <View style={tw`h-25`}>
                  <Text style={tw`text-red-900 self-center`}>
                    {message.current}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
        <View></View>
      </SafeAreaView>
    );
  }
};

export default DriversScreen;

