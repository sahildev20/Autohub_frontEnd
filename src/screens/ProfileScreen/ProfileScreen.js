import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {CustomHeading} from '../../components/small/MyUiComponents';
import AnimatedLottieView from 'lottie-react-native';
import * as assests from '../../assets/index';
import {getSignalUser, logOutUser} from '../../components/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {MY_BACKEND_URL} from '@env';
import {setUser} from '../../slices/navSlice';
import {ScrollView} from 'react-native';
import {yellow100} from 'react-native-paper/lib/typescript/styles/colors';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = React.useState(null);
  const [editable, setEditable] = React.useState(false);

  async function getUserInfo() {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const res = await axios.get(`${MY_BACKEND_URL}/user/${userId}`);
      console.log(res.data);

      setUserInfo({mobile: res.data.mobile});
    } catch (error) {
      console.log(`${error} : error in profile screen : 20`);
    }
  }
  React.useEffect(() => {
    getUserInfo();
  }, []);
  //handle push notification
  async function handlePush() {
    const playerId = await getSignalUser();
    const notificationObj = {
      contents: {en: 'Message Body'},
      include_player_ids: [playerId],
    };
    const jsonData = JSON.stringify(notificationObj);
    loggingFunction(`Attempting to send notification to ${playerId}`);

    OneSignal.postNotification(
      jsonData,
      success => {
        loggingFunction(`Success: ${JSON.stringify(success)}`);
      },
      failure => {
        loggingFunction(`Failure: ${JSON.stringify(failure)}`);
      },
    );
  }
  //user logout
  async function handleLogOut() {
    dispatch(setUser(false));
    logOutUser();
  }
  function handleChange() {
    setEditable(!editable);
  }
  const UserDetails = ({user}) => {
    if (!user) {
      return <Text>looks like you are not logged in !</Text>;
    }
    return (
      <View>
        <Text style={tw`text-lg font-bold`}>+91{user.mobile}</Text>
      </View>
    );
  };

  if (userInfo == null) {
    return null;
  } else {
    return (
      <SafeAreaView style={tw`flex-1 bg-white `}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
          <ImageBackground
            source={assests.PROFILE_BACK}
            resizeMode="cover"
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image
              style={{
                resizeMode: 'cover',
                height: 150,
                width: 150,
                position: 'relative',
                bottom: -75,
                borderRadius: 100,
                borderWidth: 4,
                borderColor: 'orange',
              }}
              source={{uri: assests.P_PIC}}
            />
          </ImageBackground>
          <View style={tw`h-20 mt-20 items-center`}>
            <UserDetails user={userInfo} />
          </View>

          {/* basics details */}
          <View style={[tw`h-50 bg-gray-100 m-4 rounded-2`, {}]}>
            <Text style={tw`text-lg font-bold ml-2`}>Basic Details</Text>
            <View style={tw`flex-row`}>
              <Text style={tw`text-lg font-bold ml-2`}>Age</Text>
              <Text style={tw`text-lg font-bold ml-20`}>18</Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`text-lg font-bold ml-2`}>Gender</Text>
              <Text style={tw`text-5 font-bold ml-20`}>Male</Text>
            </View>
          </View>

          {/* ride details */}
          <View style={[tw`h-80 bg-white m-4 rounded-2`, {}]}>
            <Text style={tw`text-lg font-bold ml-2`}>Ride Details</Text>
          </View>
          <View style={[tw`flex justify-between`]}>
            <Button
              onPress={() => handleLogOut()}
              title="Log Out"
              color="orange"
            />
            {/* <Button
              onPress={() => navigation.navigate('trackRide')}
              title="Track"
              color="orange"
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ProfileScreen;
