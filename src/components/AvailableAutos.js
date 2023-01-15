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
import {Avatar} from '@rneui/themed';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {AUTO_IMAGE} from '../assets';

const DATA = [
  {
    id: 1,
    name: 'Shared',
    label: 'Driver can pickup upto 5 passengers',
    amount: 30,
  },

  {
    id: 2,
    name: 'Personal',
    label: 'Book a personal ride',
    amount: 100,
  },
];

const AvailableAutos = () => {
  //using use state to hold the selected auto id which will be send to server later
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  //Driver or Auto component which describes the details of an available auto
  const Driver = ({item, selected, setSelected}) => {
    return (
      <TouchableOpacity
        activeOpacity={false}
        onPress={() => setSelected(item.id)}
        style={[
          styles.auto,
          {backgroundColor: selected == item.id ? '#fbb74d' : '#DDE2E6'},
        ]}>
        <View style={[tw`w-60px ml-4 h-60px items-center justify-center`]}>
          <Image
            style={{width: 40, height: 40, resizeMode: 'contain'}}
            source={{
              uri: AUTO_IMAGE,
            }}
          />
        </View>
        <View style={tw`ml-4`}>
          <Text style={tw`text-20px font-400  text-black font-bold`}>
            {item.name}
          </Text>
          <Text style={tw`text-12px text-black`}>{item.label}</Text>
        </View>
        {/* <View style={tw`flex items-end justify-end`}>
          <Text>{item.amount}</Text>
        </View> */}
      </TouchableOpacity>
    );
  };
  //to give some time to map component for loading
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  ///Main return of Available Auto Screen

  return (
    <SafeAreaView style={[tw`flex-1 bg-white `, {}]}>
      <View style={{flex: 1, display: loading ? 'flex' : 'none'}}>
        <Loading />
      </View>
      <View style={{flex: 1, display: loading ? 'none' : 'flex'}}>
        <DoubleMapComponent style={tw``} />
        <View style={tw`h-50% `}>
          <Text style={[tw`text-18px  p-3 pl-5 text-black font-bold`, {}]}>
            Auto available at the moment
          </Text>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            // ItemSeparatorComponent={() => <View style={tw`h-1px  bg-gray-600`}></View>}
            renderItem={({item}) => (
              <Driver
                item={item}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            // footer to give some space below
            ListFooterComponent={() => <View style={tw`h-18`} />}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Booking', {autoid: selected})}
          //Button to proceed to next screen and completer booking
          disabled={selected ? false : true}
          style={[
            tw` m-4 mb-10 p-2 w-40 rounded-full `,
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
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
  },
});
