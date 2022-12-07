/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {MAPBOX_API} from '@env';
import UserLocation from '../../components/UserLocation';
import tw from 'twrnc';
import MapComponent from '../../components/MapComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDropPlace,
  selectEmptyLocation,
  selectPickupAddress,
  selectPickupPlace,
  setPickupPlace,
} from '../../slices/navSlice';
import {Mybutton} from '../../components/small/MyUiComponents';

// Main functional component return by this screen
const HomeScreen = ({route, navigation}) => {
  //Getting values from slice using selector
  const emptyLocation = useSelector(selectEmptyLocation);
  const pickupAddress = useSelector(selectPickupAddress);
  const pickupPlace = useSelector(selectPickupPlace);
  const dropPlace = useSelector(selectDropPlace);
  const dispatch = useDispatch();

  const getPlaceName = async p => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${p[0]}, ${p[1]}.json?access_token=${MAPBOX_API}`,
      );
      const json = await response.json();
      // setPickupAddress(json);
      let title = json.features[0].place_name;
      dispatch(setPickupPlace(title));
      console.log('data : ', title);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getPlaceName(pickupAddress);
    console.log('fropplace:', dropPlace);
  }, [pickupAddress]);

  return (
    <SafeAreaView style={styles.homecontainer}>
      {emptyLocation === 1 ? (
        <UserLocation />
      ) : (
        <View style={styles.homecontainer}>
          <View style={styles.homecontainer}>
            <MapComponent style={{flex: 1}} />
          </View>
          <View style={styles.root}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search', {target: 'pickup'})}
              style={styles.button}>
              <Text style={styles.text}>{pickupPlace}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search', {target: 'drop'})}
              style={styles.button}>
              <Text style={styles.text}>{dropPlace}</Text>
            </TouchableOpacity>
            <View>
              <Mybutton
                title="Next"
                onPress={() => navigation.navigate('selectAuto')}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homecontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  root: {
    height: 200,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 5,
    borderTopColor: 'orange',
  },
  text: {fontSize: 14, fontWeight: '600', color: '#000000'},
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 10,
    width: '95%',
    height: 40,
    marginBottom: 10,
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
    shadowColor: '#171717',
    shadowOpacity: 0.3,
    elevation: 10,
  },
});

export default HomeScreen;
