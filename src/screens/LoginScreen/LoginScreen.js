import {Text, View, SafeAreaView, TextInput, Button} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {MY_IP} from '@env';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {saveJWTUser} from '../../components/constants/constants';
import {useDispatch} from 'react-redux';
import {setUser} from '../../slices/navSlice';

const LoginScreen = () => {
  const [oldUser, setOldUser] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function SignUp() {
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');

    async function handleSignUp() {
      if (!(phone && password && confirmPassword)) {
        setError('All fields are require');
        return;
      }
      if (!(phone.length == 10)) {
        setError('Invalid phone number');
        return;
      }

      if (!(password == confirmPassword)) {
        setError('password and confirm password should be same');
        return;
      }

      try {
        const res = await axios.post(`http://${MY_IP}:3000/user/signup`, {
          mobile: phone,
          password: password,
        });
        await saveJWTUser(res.data.token, res.data._id);
        dispatch(setUser(true));
        return;
      } catch (err) {
        if (err.response == undefined) {
          setError('Something went wrong');
          return;
        } else if (err.response.status == 409) {
          setError('You already have an account please login');
        } else {
          setError('Something Went Wrong Please try again later');
        }
      }
    }

    //return signup screen
    return (
      <View style={tw`flex-1`}>
        <Text style={tw`font-bold text-6 text-black mb-8`}>
          Create new Account
        </Text>
        <TextInput
          style={tw``}
          placeholder="Phone Number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={t => setPhone(t)}
        />

        <TextInput
          style={tw``}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={p => setPassword(p)}
        />

        <TextInput
          style={tw``}
          secureTextEntry={true}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={t => setConfirmPassword(t)}
        />

        <Button title="Create Account" onPress={handleSignUp} />

        <Text style={tw`font-bold text-3 text-black`}>{error}</Text>
      </View>
    );
  }

  function LogIn() {
    const [phone, setPhone] = React.useState('');
    const [error, setError] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleLogin() {
      if (!(phone && password)) {
        setError('all field are required');
        return;
      }
      if (!(phone.length == 10)) {
        setError('invalid phone number');
        return;
      }
      try {
        const res = await axios.post(`http://${MY_IP}:3000/user/login`, {
          mobile: phone,
          password: password,
        });
        await saveJWTUser(res.data.token, res.data._id, res.data.mobile);
        dispatch(setUser(true));
        return;
      } catch (error) {
        if (error.response == undefined) {
          return setError('something went wrong please try again later');
        } else {
          let code = error.response.status;
          if (code) {
            if (code == 401) {
              return setError('Invalid credentials');
            } else {
              return setError('something went wrong please try again later');
            }
          } else {
            return setError('something went wrong please try again later');
          }
        }
      }
    }

    return (
      <View style={tw`flex-1`}>
        <Text style={tw`font-bold text-6 text-black mb-8`}>LogIn</Text>
        <TextInput
          style={tw``}
          value={phone}
          keyboardType="number-pad"
          onChangeText={t => setPhone(t)}
          placeholder="Phone Number"
        />
        <TextInput
          style={tw``}
          value={password}
          secureTextEntry={true}
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
    <SafeAreaView style={tw`flex-1 p-8 bg-white`}>
      {oldUser ? <LogIn /> : <SignUp />}
      <Text style={tw`mb-4 text-3 font-bold`}>
        {oldUser
          ? `If you don't have an account`
          : `If you already have an account`}
      </Text>
      <Button
        color="orange"
        title={oldUser ? 'SignUp' : 'LogIn'}
        onPress={handleToggleScreen}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
