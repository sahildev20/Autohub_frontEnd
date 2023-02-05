import {Text, View} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import {Rating, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {AUTO_IMAGE} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {Item} from './MyUiComponents';

function Driver({item, rideType}) {
  const navigation = useNavigation();

  return (
    <View style={tw`p-6 bg-white m-4 rounded-4`}>
      {/* <Image
          style={[tw`w-80-px h-80-px self-center m-6`, {resizeMode: 'contain'}]}
          source={{
            uri: AUTO_IMAGE,
          }}
        /> */}
      <View>
        <Item head="Name" tail={`${item.name}`} icon="B" />

        <Item head="Vehicle Number" tail={`${item.vehicleNumber}`} icon="B" />
        <Item head="Seat available" tail={`${item.availableSeats}`} icon="B" />
        <Item head="Arrival Time" tail={`${item.duration} minutes`} icon="B" />
        <Item
          head="Distance from you"
          tail={`${item.distance} kms `}
          icon="B"
        />
        <View style={tw`flex-row items-end justify-between mb-4 mt-4`}>
          <Rating
            type="heart"
            startingValue={item.rating}
            imageSize={16}
            readonly={true}
          />
        </View>
        <Button
          title="Book Now"
          raised
          onPress={() =>
            navigation.navigate('Booking', {
              driverId: item._id,
              rideType,
            })
          }
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['orange', 'red'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
        />
      </View>
    </View>
  );
}

export default Driver;
