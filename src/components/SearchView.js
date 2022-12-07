/* eslint-disable prettier/prettier */

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import * as React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {MAPBOX_API} from '@env';
import {useDispatch} from 'react-redux';
import {setDropAddress, setDropPlace} from '../slices/navSlice';

const DATA = [
  {place_id: 1, display_name: 'Bus Stand', lat: '', lon: ''},
  {place_id: 2, display_name: 'Mewat Engineering College', lat: '', lon: ''},
  {place_id: 3, display_name: 'Nuh Wala Adda', lat: '', lon: ''},
  {place_id: 4, display_name: 'Sonf mod', lat: '', lon: ''},
];

const SearchView = ({route}) => {
  const dispatch = useDispatch();
  const {target} = route.params;
  const navigation = useNavigation();
  const [place, setPlace] = React.useState('');
  const [placeName, setPlaceName] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(null);
  const [masterData, setMasterData] = React.useState(null);

  // fetching data from an api
  React.useEffect(() => {
    filterData();
    if (place === '') {
      setMasterData(DATA);
    }
    if (!place == ' ') {
      getMasterData();
    }
  }, [place]);
  //this function will fetch the places based on user search input...
  const getMasterData = async () => {
    try {
      const response = await fetch(
        // `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=77,28.1&access_token=${MAPBOX_API}`,
        `https://api.locationiq.com/v1/autocomplete?key=pk.0f57b08b8e518c12de8e3ca9aa955f74&q=${place}&limit=5&countrycodes=in&dedupe=1`,
      );
      const json = await response.json();
      if (json.error) {
      } else {
        let tempData = [];
        for (let i = 0; i < json.length; i++) {
          const {place_id, display_name, lat, lon} = json[i];
          //   let id = json[i].place_id;
          //   let name = json[i].name;
          //   let display_name = json[i].display_name;
          //   let lat = json[i].lat;
          //   let lon = json[i].lon;

          tempData.push({place_id, display_name, lat, lon});
        }
        console.log('tempdata :', tempData);
        setMasterData(tempData);
      }
      //   let item = json.features[3].place_name;
      //   console.log('item :', item);
    } catch (error) {
      console.error(error);
    }
  };

  //this is to make an dynamic search bar and
  const filterData = () => {
    const tempData = [];
    for (let i = 0; i < DATA.length; i++) {
      const element = DATA[i];
      //   console.log('element :', element);

      if (element.display_name.toLowerCase().indexOf(place) != -1) {
        tempData.push(element);
      }
    }
    setFilteredData(tempData);
  };

  //it is function called when submit the search value
  const handleSubmit = item => {
    const {lat, lon, display_name} = item;
    let coords = [Number(lon), Number(lat)];
    console.log(coords);
    dispatch(setDropPlace(display_name));
    dispatch(setDropAddress(coords));
    navigation.navigate('Home');
  };
  const Place = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleSubmit(item);
        }}
        style={tw`pl-8 p-3 `}>
        <Text style={tw`text-black text-4 font-bold mb-2 `}>
          {item.display_name}
        </Text>
        <Text style={tw`text-black text-4  `}>{item.lat}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-white`}>
      <View style={tw`flex-1`}>
        <FlatList
          ListHeaderComponent={
            <TextInput
              style={tw`bg-gray-300 rounded-full pl-5 text-16px text-black`}
              placeholderTextColor="black"
              placeholder="Search a place"
              value={place}
              onChangeText={text => setPlace(text.toLowerCase())}
            />
          }
          data={masterData}
          keyExtractor={item => item.place_id}
          renderItem={({item}) => <Place item={item} />}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Booking', {
            initialLocation: 'Mewat Engg College',
          })
        }
        style={tw`rounded-full p-3 bg-orange-500 mt-5`}>
        <Text>Till than explore the app {target}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: 10,
    width: '95%',
    position: 'absolute',
    top: 20,
  },
});
