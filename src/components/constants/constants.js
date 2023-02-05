import AsyncStorage from '@react-native-async-storage/async-storage';
import Keychain from 'react-native-keychain';

export const saveJWTUser = async (jwt, userId) => {
  await Keychain.setGenericPassword(userId, jwt);
  await AsyncStorage.setItem('userId', userId);
  const credentials = await Keychain.getGenericPassword();
  console.log('credentials', credentials);
};

export const retrieveJWTUser = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return credentials;
  }
};

export const retrieveJWTUserId = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    const userId = credentials.username;
    return userId;
  }
};
export const logOutUser = async () => {
  await Keychain.resetGenericPassword();
  await AsyncStorage.removeItem('userId');
};

export const saveSignalUser = async playerId => {
  await AsyncStorage.setItem('playerId', playerId);
  return true;
};

export const getSignalUser = async () => {
  const playerId = await AsyncStorage.getItem('playerId', playerId);
  return playerId;
};
