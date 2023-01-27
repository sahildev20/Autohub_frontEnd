import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  TextInput,
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
      console.log(error);
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
      return null;
    }
    return (
      <View editable={true}>
        {editable ? (
          <TextInput
            value={user.mobile}
            onChangeText={text => {
              handleChange();
            }}
          />
        ) : (
          <Text>{user.mobile}</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 p-8 pt-0`}>
      <CustomHeading text="Profile" />
      <View style={tw`flex-1 items-center justify-center`}>
        <AnimatedLottieView
          style={{width: 150}}
          source={assests.PANDA}
          autoPlay
          loop
        />
        <Text>Your profile is awesome but invisible right now !</Text>
      </View>
      <UserDetails user={userInfo} />
      <View style={tw`flex-1 `}>
        <Button
          title="Edit Profile"
          color="black"
          onPress={() => setEditable(true)}
        />

        <Button onPress={() => handleLogOut()} title="Log Out" color="orange" />
        <Button
          onPress={() => navigation.navigate('trackRide')}
          title="Track"
          color="orange"
        />
        <Button onPress={() => handlePush()} title="Log Out" color="orange" />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
