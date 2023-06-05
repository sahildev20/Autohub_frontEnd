import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {MY_BACKEND_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {getOTP, saveJWTUser} from '../../components/constants/constants';
import {useDispatch} from 'react-redux';
import {setUser} from '../../slices/navSlice';
import {Mybutton} from '../../components/small/MyUiComponents';
import Loading from '../../components/Loading';
import {BUTTON_COLOR, LOGO_SMALL} from '../../assets';

//////

const LoginScreen = () => {
  const [mobile, setMobile] = useState(0);
  const [otp, setOtp] = useState(0);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(true);

  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //error handling

  const handleError = ({title, msg}) =>
    Alert.alert(
      'Invalid Phone Number',
      `${msg}`,
      [
        {
          text: 'Got it',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );

  const handleMobileChange = newMobile => {
    setMobile(newMobile);
  };

  const handleOtpChange = newOtp => {
    setOtp(newOtp);
  };

  const handleSendOtpPress = async () => {
    if (mobile.length !== 10) {
      handleError('please enter 10 digit valid mobile number');
      return;
    }
    try {
      const sentOTP = await getOTP(mobile);
      if (sentOTP == 1) {
        setShowOtpInput(true);
      } else {
        setError('Unable to send OTP please try again later');
      }
    } catch (error) {
      console.error(error);
      handleError('something went wrong ', error.message);
    }
  };

  const handleLoginPress = async () => {
    if (otp.length !== 6) {
      handleError('please enter valid 6 digit otp');
      return;
    }
    try {
      const res = await axios.post(
        `${MY_BACKEND_URL}/user/login`,

        {
          mobile: Number(mobile),
          password: Number(otp),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!res) {
        console.log('no response');
      }
      setLoaded(false);
      await saveJWTUser(res.data.token, res.data.userId);
      dispatch(setUser(true));
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
      handleError(`${error.message}`);
      al;
    }

    //   if (error.response == undefined) {
    //     return setError('something went wrong please try again later');
    //   } else {
    //     let code = error.response.status;
    //     if (code) {
    //       if (code == 401) {
    //         return setError('Invalid credentials');
    //       } else {
    //         return setError('something went wrong please try again later');
    //       }
    //     } else {
    //       return setError('something went wrong please try again later');
    //     }
    //   }
    // }
  };
  if (!loaded) {
    return (
      <SafeAreaView style={tw`bg-white flex-1 items-center justify-center`}>
        <Loading />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={tw`bg-white flex-1 p-8`}>
      <Image style={{width: 100, resizeMode: 'contain'}} source={LOGO_SMALL} />
      {/* <CustomHeading text="Log In" /> */}

      {!showOtpInput && (
        <>
          {/* <Text style={tw`text-4 text-black `}>Enter Mobile Number</Text> */}
          <Text style={tw`text-5 text-black mb-8 mt-10 font-bold`}>
            Please enter your mobile number to continue..
          </Text>
          <View
            style={tw`border-2 border-orange-500 rounded pl-2 flex-row items-center `}>
            <Text style={tw`text-4 font-bold `}>+91</Text>
            <TextInput
              style={tw`text-4 w-100`}
              keyboardType="number-pad"
              value={mobile}
              maxLength={10}
              placeholder="Phone Number"
              onChangeText={handleMobileChange}
            />
          </View>
          <Mybutton
            title="Send OTP"
            color={BUTTON_COLOR}
            style={{width: '100%', borderRadius: 4}}
            onPress={handleSendOtpPress}
          />
          <View
            style={[
              tw`items-center content-center self-center mt-10`,
              // {position: 'absolute', bottom: 10, padding: 20},
            ]}>
            <Text style={tw`text-4 text-center text-black`}>
              Proceeding with mobile number means you are agree to our
              <Text style={tw`text-blue-500`}> terms and conditions.</Text>
            </Text>
          </View>
        </>
      )}
      {showOtpInput && (
        <>
          <Text style={tw`text-4 text-black mt-10 font-bold`}>
            An OTP has been sent to +91{mobile}
          </Text>
          <View style={tw`border-2 border-orange-500 rounded pl-2 mt-4 `}>
            <TextInput
              style={tw`text-4 w-100`}
              placeholder="Enter OTP"
              maxLength={6}
              keyboardType="number-pad"
              value={otp}
              onChangeText={handleOtpChange}
            />
          </View>
          <Mybutton
            title="DONE"
            style={{width: '100%', borderRadius: 4}}
            onPress={handleLoginPress}
          />
          <View
            style={[
              tw`items-center content-center self-center mt-10`,
              // {position: 'absolute', bottom: 10, padding: 20},
            ]}>
            <Text style={tw`text-4 text-center text-black`}>
              If you have not recieved the OTP click
              <Text style={tw`text-blue-500`}> Resend</Text>
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
