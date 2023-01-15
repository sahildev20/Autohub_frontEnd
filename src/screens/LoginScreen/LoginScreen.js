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
import axios from 'axios';

const LoginScreen = () => {
  const [oldUser, setOldUser] = React.useState(false);
  const navigation = useNavigation();

  async function handleLogin() {
    setOldUser(!oldUser);
  }

  function SignUp() {
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');

    function handleSignUp() {
      if (password && phone && confirmPassword && password == confirmPassword) {
        axios
          .post('http://192.168.161.77:3000/sbamsignup', {
            mobile: phone,
            password: password,
          })
          .then(res => {
            if (res.status === 201) {
              return navigation.navigate('Home');
            } else if (res.status === 409) {
              setError(res.message);
            } else {
              setError('Something went wrong');
            }
            console.log(res.status);
          })
          .catch(err => {
            if (err.response.status === 409) {
              setError('User already exists please login');
            } else {
              setError('Something went wrong');
            }
          });
      } else {
        setError('password and confirm password should be same');
      }
    }

    //return signup screen
    return (
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
        <Text style={tw`font-bold text-3 text-black`}>{error}</Text>
      </View>
    );
  }

  function LogIn() {
    const [phone, setPhone] = React.useState('');
    const [error, setError] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleLogin() {
      axios
        .post('http://192.168.161.77:3000/login', {
          mobile: phone,
          password: password,
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.message) {
            setError(error.response.message);
          }
          setError('something went wrong');
        });
    }

    return (
      <View>
        <Text style={tw`font-bold text-6 text-black`}>LogIn</Text>
        <TextInput
          style={tw``}
          value={phone}
          onChangeText={t => setPhone(t)}
          placeholder="Phone Number"
        />
        <TextInput
          style={tw``}
          value={password}
          onChangeText={p => setPassword(p)}
          placeholder="Password"
        />
        <Button title="Login" onPress={() => handleLogin()} />
        <Text style={tw`font-bold text-3 text-black`}>{error}</Text>
      </View>
    );
  }

  function handleToggleScreen() {
    setOldUser(!oldUser);
  }
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center p-8`}>
      {oldUser ? <LogIn /> : <SignUp />}
      <Button
        title={oldUser ? 'SignUp' : 'LogIn'}
        onPress={handleToggleScreen}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
