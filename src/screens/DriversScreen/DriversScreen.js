/* eslint-disable prettier/prettier */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import axios from 'axios';
import {MY_BACKEND_URL} from '@env';
import {useSelector} from 'react-redux';
import {selectPickupAddress, selectDropAddress} from '../../slices/navSlice';
import {AUTO_IMAGE} from '../../assets';

function Driver({item}) {
  return (
    <TouchableOpacity style={tw`flex-row p-8 items-center`}>
      <Image
        style={[tw`w-60=px h-60-px mr-10`, {resizeMode: 'contain'}]}
        source={{
          uri: AUTO_IMAGE,
        }}
      />
      <View>
        <Text style={tw`text-20px font-400 mb-2`}>{item.vehicleNumber}</Text>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
const DriversScreen = ({route}) => {
  const [data, setData] = useState(null);
  const {autoid} = route.params;
  const pickupCoordinates = useSelector(selectPickupAddress);
  const dropCoordinates = useSelector(selectDropAddress);

  async function getAvailableDrivers() {
    axios
      .post(
        `${MY_BACKEND_URL}/driver/getAvailableDrivers`,
        {
          location: 'alafia',
          latitude: pickupCoordinates[1],
          longitude: pickupCoordinates[0],
          sendMeThis: '_id vehicleNumber name',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        const availableDrivers = res.data;
        setData(availableDrivers);
      })
      .catch(err => {
        console.log('error:', err);
      });
  }

  async function getAvailableRides() {
    axios
      .post(
        `${MY_BACKEND_URL}/getAvailableRides`,
        {
          location: 'alafia',
          userId: 'abcdefg',
          pickupCoordinates,
          dropCoordinates,
          sendMeThis: '_id vehicleNumber name',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log({data: res.data});
        // setData(availableDrivers);
      })
      .catch(err => {
        console.log('error:', err);
      });
  }

  //fetch nearest driver from server
  useEffect(() => {
    if (autoid == 'Personal') {
      getAvailableDrivers();
    } else {
      getAvailableRides();
    }
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 `}>
      <Text style={tw`text-6 pl-8 mt-10  font-bold`}>Available Auto</Text>
      <TextInput
        placeholder="Search by Auto number or Driver name"
        style={[
          tw`m-4 pl-10 rounded-full`,
          {borderWidth: 2, borderColor: 'gray'},
        ]}
      />
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => (
            <View style={tw`h-1px bg-orange-300`}></View>
          )}
          renderItem={({item}) => <Driver item={item} />}
          ListFooterComponent={() => (
            <View style={tw`h-50 pl-8`}>
              <Text style={tw`text-red-900 self-center`}>
                Opps ! Looks like you have reach the end
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default DriversScreen;

const styles = StyleSheet.create({});
