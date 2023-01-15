import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Avatar, Icon} from '@rneui/themed';
import {Mybutton} from '../../components/small/MyUiComponents';
import {BUTTON_COLOR} from '../../assets';

const BusDATA = [
  {id: 'BX-1234', name: 'Rohan'},
  {id: 'BX-1235', name: 'Imran'},
  {id: 'BX-1236', name: 'Yoosuf'},
  {id: 'BX-1237', name: 'Irfan'},
];
const Screen = () => {
  const [authorized, setAuthorized] = React.useState(false);

  const Authentication = () => {
    return (
      <View style={tw`mt-4`}>
        <View style={{}}>
          <Text style={tw`mt-8 text-6 text-black font-bold `}>
            Login as MEC Student
          </Text>

          <View
            style={[tw`mt-4 p-4 bg-white`, {elevation: 20, borderRadius: 10}]}>
            <Text style={tw`font-bold text-4 mt-4 `}>
              Enter MDU registration number
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
              }}
            />
            <Text style={tw`font-bold text-4 mt-8`}>Enter password</Text>

            <TextInput
              keyboardType="password"
              placeholder=""
              style={{
                borderBottomWidth: 1,
                marginBottom: 4,
              }}
            />
            <View style={tw`flex-row justify-around`}>
              <Mybutton
                onPress={() => setAuthorized(!authorized)}
                title="Login"
                width="45%"
                color={BUTTON_COLOR}
              />
              <Mybutton
                onPress={() => alert('Call us at 8302332297')}
                title="Contact Us"
                width="45%"
                color={BUTTON_COLOR}
              />
            </View>
          </View>
          <Text style={tw` text-5 text-center mt-6 text-red-800`}>
            If you don't have password please contact us.
          </Text>
        </View>
      </View>
    );
  };
  const Authorized = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-4`}>
        <View style={tw`flex-row items-center `}>
          <Avatar style={[tw`bg-red-900 `, {borderRadius: 100}]}>
            <Icon name="face" size={30} color="red" />
          </Avatar>
          <Text style={tw`text-14px ml-2 font-bold`}>Hii, SAHIL</Text>
        </View>
        <Text style={tw`text-4 font-bold text-black mt-4 mb-2`}>
          Anouncements
        </Text>
        <View
          style={[
            tw` bg-white p-4 m-1 mb-4 bg-blue-100`,
            {borderRadius: 10, elevation: 2},
          ]}>
          <Text style={tw`text-4 text-black font-black`}>Today</Text>
          <Text style={tw`text-4 mt-2 `}>
            Today there is a seminar for 7th sem students
          </Text>
          <Text style={tw`text-4 mt-2 text-black font-black`}>Tomorrow</Text>
          <Text style={tw`text-4 mt-2 `}>Tomorrow will be holiday.</Text>
        </View>
        <Text style={tw`text-4 mb-2 font-bold text-black mt-6`}>
          Find a college bus
        </Text>
        <View
          style={[
            tw`flex-row bg-yellow-100 p-4 m-1 mb-4 justify-around `,
            {borderRadius: 10, elevation: 2},
          ]}>
          <TouchableOpacity
            style={[
              tw`bg-white items-center bg-white p-4`,
              {borderRadius: 10},
            ]}>
            <Icon name="apartment" size={40} />
            <Text style={tw`mt-4`}>To College</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`items-center p-4 bg-white`,
              {elvation: 2, borderRadius: 10},
            ]}>
            <Icon name="house" size={40} />
            <Text style={tw`mt-4`}>From College</Text>
          </TouchableOpacity>
        </View>
        <Text style={tw`text-4 font-bold text-black mt-6`}>
          Track any bus: only for staff
        </Text>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={BusDATA}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={[
                    tw`bg-white m-4 p-8 bg-blue-100`,
                    {borderRadius: 10, elevation: 4},
                  ]}>
                  <Icon type="evilicon" name="arrow-right" size={40} />
                  <Text style={tw`text-5 mt-4`}>{item.id}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Mybutton
          onPress={() => setAuthorized(!authorized)}
          title="LogOut"
          width="90%"
          color={BUTTON_COLOR}
        />
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white p-8 pt-0`}>
      {authorized ? <Authorized /> : <Authentication />}
    </SafeAreaView>
  );
};

export default Screen;
