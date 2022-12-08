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
import {
  setDropAddress,
  setDropPlace,
  setPickupAddress,
  setPickupPlace,
} from '../slices/navSlice';

const DATA = [
  {
    place_id: 1,
    display_name: 'Bus stand, nuh, haryana',
  },
  {
    place_id: 2,
    display_name: 'Mewat Engineering College, nuh, haryana',
  },
  {
    place_id: 3,
    display_name: 'Nuh Wala Adda, Tapukara, Rajasthan',
  },
  {
    place_id: 4,
    display_name: 'Sonf mod, palla, nuh, haryana',
  },
];

const SearchView = ({route}) => {
  const dispatch = useDispatch();
  const {isPickup} = route.params;
  const navigation = useNavigation();
  const [place, setPlace] = React.useState('');
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
        `https://api.locationiq.com/v1/autocomplete?key=pk.0f57b08b8e518c12de8e3ca9aa955f74&q=${place}&limit=5&countrycodes=in&dedupe=1`,
      );
      const json = await response.json();
      console.log('json data:', json);
      if (json.error) {
      } else {
        let tempData = [];
        for (let i = 0; i < json.length; i++) {
          const {place_id, display_name} = json[i];
          tempData.push({place_id, display_name});
        }
        setMasterData(tempData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //this is to make an dynamic search bar and
  const filterData = () => {
    const tempData = [];
    for (let i = 0; i < DATA.length; i++) {
      const element = DATA[i];
      if (element.display_name.toLowerCase().indexOf(place) != -1) {
        tempData.push(element);
      }
    }
    setFilteredData(tempData);
  };
  ///function to use mapbox api to set coordinates
  const updatePickupAddress = async display_name => {
    const search_term = display_name.substring(0, display_name.indexOf(','));
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_term}.json?country=in&proximity=ip&autocomplete=false&access_token=${MAPBOX_API}`,
      );
      const json = await response.json();
      // setPickupAddress(json);
      let coords = await json.features[0].geometry.coordinates;
      console.log('pcoords:', coords);
      if (isPickup) {
        dispatch(setPickupAddress(coords));
      } else {
        dispatch(setDropAddress(coords));
      }
    } catch (error) {
      console.error(error);
    }
  };
  //it is function called when submit the search value
  const handleSubmit = item => {
    const {display_name} = item;
    if (isPickup) {
      dispatch(setPickupPlace(display_name));
    } else {
      dispatch(setDropPlace(display_name));
    }
    updatePickupAddress(display_name);

    navigation.navigate('Home');
  };

  //place funtion which will render as list item in flatlist
  const Place = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleSubmit(item);
        }}
        style={tw`pl-8 p-3 `}>
        <Text style={tw`text-black text-4 font-bold mb-2 `}>
          {item.display_name.substring(0, item.display_name.indexOf(','))}
        </Text>
        <Text style={tw`text-black text-3  `}>{item.display_name}</Text>
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
