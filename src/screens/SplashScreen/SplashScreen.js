import {View, Text} from 'react-native';
import React from 'react';
import {CAR} from '../../assets';
import AnimatedLottieView from 'lottie-react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {
  retrieveJWTUser,
  saveSignalUser,
} from '../../components/constants/constants';
import {selectUser} from '../../slices/navSlice';
import OneSignal from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from '@env';

// OneSignal Initialization
OneSignal.setAppId(ONESIGNAL_APP_ID);

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
});
const SplashScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const navigation = useNavigation();
  let user = useSelector(selectUser);

  async function getDevice() {
    const device = await OneSignal.getDeviceState();
    if (device) {
      saveSignalUser(device.userId);
    }
    console.log({device: device.userId});
  }
  const getLogin = async user => {
    if (user == true || user == false) {
      const cred = await retrieveJWTUser();

      if (!cred) {
        setTimeout(() => {
          setIsLoggedIn(false);
          navigation.replace('login');
        }, 3000);
      } else {
        setTimeout(() => {
          setIsLoggedIn(true);
        }, 3000);
      }
    }
  };
  React.useEffect(() => {
    getLogin(user);
    getDevice();
  }, [user]);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <AnimatedLottieView
        style={{width: 250}}
        source={CAR}
        autoPlay
        speed={1}
        loop={true}
      />
    </View>
  );
};

export default SplashScreen;
