import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {React, useState} from 'react';
import {Avatar} from '@rneui/themed';
import tw from 'twrnc';
import {AUTO_IMAGE} from '../../assets';
const data = [
  {
    Id: 1,
    Title: 'Ride to Tapukara',
    Date: '11/12/24',
    Time: '12.30 AM',
    Amount: 60,
    Age: 'Today',
    From: 'Mewat engineering college',
    To: 'Tapukara',
  },
  {
    Id: 2,
    Title: 'Ride to Malab',
    Date: '10/12/24',
    Time: '4.30 PM',
    Amount: 20,
    Age: 'Yesterday',
    From: 'Mewat engineering college',
    To: 'Malab',
  },
  {
    Id: 3,
    Title: 'Ride to Sohna',
    Date: '09/12/24',
    Time: '03.00 PM',
    Amount: 50,
    Age: '3 days ago',
    From: 'Mewat engineering college',
    To: 'Sohna',
  },
  {
    Id: 4,
    Title: 'Ride to Tapukara',
    Date: '08/12/22',
    Time: '04.30 PM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tapukara',
  },
  {
    Id: 5,
    Title: 'Ride to Sohna',
    Date: '07/12/22',
    Time: '03.30 PM',
    Amount: 50,
    Age: '5 days ago',
    From: 'Mewat engineering college',
    To: 'Sohna',
  },
  {
    Id: 6,
    Title: 'Ride to Tauru',
    Date: '06/12/22',
    Time: '11.30 AM',
    Amount: 40,
    Age: '6 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 7,
    Title: 'Ride to Alwar',
    Date: '05/12/22',
    Time: '11.00 AM',
    Amount: 80,
    Age: '7 days ago',
    From: 'Mewat engineering college',
    To: 'Alwar',
  },
  {
    Id: 8,
    Title: 'Ride to Firozpur',
    Date: '04/12/22',
    Time: '05.30 PM',
    Amount: 60,
    Age: '8 days ago',
    From: 'Mewat engineering college',
    To: 'Firozpur',
  },
  {
    Id: 9,
    Title: 'Ride to GURUGRAM',
    Date: '03/12/22',
    Time: '02.30 PM',
    Amount: 100,
    Age: '9 days ago',
    From: 'Mewat engineering college',
    To: 'GURUGRAM',
  },
  {
    Id: 10,
    Title: 'Ride to Sohna',
    Date: '02/12/22',
    Time: '03.30 PM',
    Amount: 40,
    Age: '10 days ago',
    From: 'Mewat engineering college',
    To: 'Sohna',
  },
  {
    Id: 11,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '04.00 PM',
    Amount: 40,
    Age: '11 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
];

const HistoryScreen = () => {
  const [showCard, setShowCard] = useState(false);

  const Card = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          tw`flex-row items-center justify-between mt-4 p-4 border-gray-300`,
          {borderBottomWidth: 0.8},
        ]}>
        <View style={tw`rounded-full p-4 bg-gray-200 mr-3`}>
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
            }}
            source={{uri: AUTO_IMAGE}}
          />
        </View>

        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <Text style={tw`text-16px text-black`}>{item.Title}</Text>
              <Text style={tw`text-gray-700 text-14px`}>
                From : {item.From}
              </Text>
            </View>
            <Text style={tw`text-black text-18px font-bold `}>
              ₹ {item.Amount}
            </Text>
          </View>
          <View style={tw` flex-row justify-between pt-4`}>
            <Text style={tw` text-gray-500 text-12px`}>{item.Age}</Text>

            <Text style={tw`text-black text-12px`}>{item.Time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1  bg-indigo-100`}>
      <View
        style={[
          tw`h-12 rounded-full bg-white m-2 justify-center`,
          {
            borderColor: 'indigo',
            borderWidth: 1,
          },
        ]}>
        <Text
          style={tw`self-center text-gray-600 font-bold text-4 tracking-widest`}>
          Your incoming rides will appear here.
        </Text>
      </View>
      <View style={tw`bg-white ml-2 mr-2 mt-2 `}>
        <FlatList
          data={data}
          keyExtractor={item => item.Id}
          renderItem={({item}) => <Card item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
