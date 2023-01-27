import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {React, useState, useEffect} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';

import {DoubleMapComponent} from './MapComponent';

import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';

import Loading from '../components/Loading';

import axios from 'axios';

import {MY_BACKEND_URL} from '@env';
import {useSelector} from 'react-redux';
import {selectRideInformation} from '../slices/navSlice';

const AvailableAutos = () => {
  //using use state to hold the selected auto id which will be send to server later
  const [data, setData] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // navigation
  const navigation = useNavigation();

  const rideInfo = useSelector(selectRideInformation);
  //fetch vehicle data from server

  async function fetchData() {
    axios
      .get(`${MY_BACKEND_URL}/vehicles`)
      .then(response => {
        setData(response.data);
        setInterval(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(err => {
        console.log({err: err.message});
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  //a component which describes the details of an available auto
  const RideTypeItem = ({item, selected, setSelected}) => {
    return (
      <TouchableOpacity
        activeOpacity={false}
        onPress={() => setSelected(item.title)}
        style={[
          styles.auto,
          {backgroundColor: selected == item.title ? '#fbb74d' : '#DDE2E6'},
        ]}>
        <View style={[tw`w-60px ml-4 h-60px items-center justify-center`]}>
          <Image
            style={{width: 40, height: 40, resizeMode: 'contain'}}
            source={{
              uri: item.imageURL,
            }}
          />
        </View>
        <View style={tw`ml-4`}>
          <Text style={tw`text-20px font-400  text-black tracking-widest`}>
            {item.title}
          </Text>
          <Text style={tw`text-12px text-black`}>{item.tagline}</Text>
        </View>
        <View style={tw`flex-1 items-end justify-end p-2`}>
          <Text style={tw`font-bold text-black`}>
            ₹ {Math.round(rideInfo[0] * item.ratePerKM)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  ///Main return of Available Auto Screen

  return (
    <SafeAreaView style={[tw`flex-1 bg-white `, {}]}>
      <View style={{flex: 1, display: loading ? 'flex' : 'none'}}>
        <Loading />
      </View>
      <View style={{flex: 1, display: loading ? 'none' : 'flex'}}>
        <DoubleMapComponent style={tw`flex-1`} />
        <View style={tw``}>
          <Text
            style={[
              tw`text-4  p-2 pl-4 text-black font-bold tracking-widest`,
              {},
            ]}>
            SELECT TYPE OF RIDE
          </Text>
          <FlatList
            data={data}
            keyExtractor={item => item.title}
            // ItemSeparatorComponent={() => <View style={tw`h-1px  bg-gray-600`}></View>}
            renderItem={({item}) => (
              <RideTypeItem
                item={item}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            // footer to give some space below
            ListFooterComponent={() => <View style={tw`h-15`} />}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Drivers', {autoid: selected})}
          //Button to proceed to next screen and completer booking
          disabled={selected ? false : true}
          style={[
            tw` m-4 p-2 w-40 rounded-full `,
            styles.nextButton,
            {backgroundColor: selected ? '#fbb74d' : 'gray'},
          ]}>
          <Text style={tw`text-5 self-center text-white`}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
//In future I will add a component like a popup where user can review all info of auto...
//...like reviews and working habits etc.

export default AvailableAutos;

const styles = StyleSheet.create({
  nextButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  popUp: {
    position: 'absolute',
    height: '70%',
    width: '80%',
    top: 100,
    backgroundColor: '#fbb74d',
    alignSelf: 'center',
  },
  auto: {
    flexDirection: 'row',
    padding: 8,
    width: '90%',
    borderRadius: 4,
    margin: 8,
    marginBottom: 12,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
  },
});
