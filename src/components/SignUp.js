import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [phone, setPhone] = React.useEffect('');
  const [password, setPassword] = React.useEffect('');
  const [confirmPassword, setConfirmPassword] = React.useEffect('');
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
      <View>
        <Text style={tw`font-bold text-6 text-black`}>Create new Account</Text>
        <TextInput
          style={tw``}
          placeholder="Phone Number"
          value={phone}
          onChangeText={t => setPhone(t)}
        />
        <TextInput
          style={tw``}
          placeholder="Password"
          value={password}
          onChangeText={p => setPassword(p)}
        />
        <TextInput
          style={tw``}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={t => setConfirmPassword(t)}
        />
        <Button title="Create Account" onPress={() => handleSignUp()} />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
