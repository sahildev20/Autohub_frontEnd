/* eslint-disable prettier/prettier */

import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Item, Mybutton } from '../../components/small/MyUiComponents';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectRideInformation} from '../../slices/navSlice';
import Loading from '../../components/Loading';

const BookingScreen = ({route}) => {
  const [loading, setLoading] = React.useState(true);
  const rideInformation = useSelector(selectRideInformation);
  const distance = Math.round(rideInformation[0] / 1000);
  const time = Math.round(rideInformation[1] / 60);
  const {autoid} = route.params;
  const navigation = useNavigation();
  return loading ? (
    <>
      <Loading />
      <Button title="auto find nearby" onPress={() => setLoading(false)} />
    </>
  ) : (
    <SafeAreaView style={tw`flex-1 p-8  `}>
      <Text style={tw`font-bold text-5`}>Successfull</Text>
      <View style={tw`h-50% bg-yellow-500 items-center justify-center`}>
        <Text style={tw`font-bold text-5`}>
          {' '}
          You have Successfully booked a {autoid === 1
            ? 'Shared'
            : 'Personal'}{' '}
          auto ride !{' '}
        </Text>
      </View>
      <View style={tw``}>
        <Item head="Arriving Time" tail={`${time} Minutes`} icon="A" />
        <Item head="Distance" tail={`${distance} KMS`} icon="B" />
        <Item head="Driver Rating" tail="*****" icon="C" />
      </View>
      <View
        style={[
          tw`flex-row flex-1 items-center`,
          {justifyContent: 'space-between', marginTop: 1},
        ]}>
        <Mybutton
          title="Cancel"
          onPress={() => alert('Are you sure you wanna cancel')}
          color="orange"
        />
        <Mybutton
          title="Track"
          onPress={() => navigation.navigate('trackRide')}
          color="orange"
        />
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
});
