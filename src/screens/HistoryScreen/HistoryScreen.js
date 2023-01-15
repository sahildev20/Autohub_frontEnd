import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

} from 'react-native';
import {React, useState} from 'react';
import {Avatar} from '@rneui/themed';
import tw from 'twrnc';
const data = [
  {
    Id: 1,
    Title: 'Ride to Tapukara',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: 'Today',
    From: 'Mewat engineering college',
    To: 'Tapukara',
  },
  {
    Id: 2,
    Title: 'Ride to Malab',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: 'Yesterday',
    From: 'Mewat engineering college',
    To: 'Malab',
  },
  {
    Id: 3,
    Title: 'Ride to Sohna',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '3 days ago',
    From: 'Mewat engineering college',
    To: 'Sohna',
  },
  {
    Id: 4,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 5,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 6,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 7,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 8,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 9,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 10,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
  {
    Id: 11,
    Title: 'Ride to Tauru',
    Date: '01/12/22',
    Time: '12.30 AM',
    Amount: 60,
    Age: '4 days ago',
    From: 'Mewat engineering college',
    To: 'Tauru',
  },
];

const HistoryScreen = () => {
  const [showCard, setShowCard] = useState(false);

  const Card = ({item}) => {
    return (
      <TouchableOpacity
        style={tw`flex-row items-center justify-between bg-[#8ECAE6] mt-4 p-4`}>
        <Avatar style={tw`w-50px h-50px mr-4 rounded-full bg-orange-300`} />
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <Text style={tw`text-16px font-bold`}>{item.Title}</Text>
              <Text style={tw`text-black text-12px`}>From : {item.From}</Text>
            </View>
            <Text style={tw`text-black text-18px font-bold `}>
              ₹ {item.Amount}
            </Text>
          </View>
          <View style={tw` flex-row justify-between pt-4`}>
            <Text style={tw` text-black text-12px`}>{item.Age}</Text>

            <Text style={tw`text-black text-12px`}>{item.Time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1  bg-white`}>
      <View style={tw`bg-white m-3 rounded `}>
        <FlatList
          data={data}
          keyExtractor={item => item.Id}
          renderItem={({item}) => <Card item={item} />}
          ListHeaderComponent={() => {
            return (
              <Text
                style={tw`self-center text-black font-bold text-3 tracking-widest`}>
                Your future rides will appear here.
              </Text>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
