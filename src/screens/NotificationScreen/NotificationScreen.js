/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';

const NotificationScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}> Notifications </Text>

      <Button
        style={styles.button}
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        style={styles.button}
        title="Go Home"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 20, color: 'red'},
  button: {width:300, margin:20},
});

export default NotificationScreen;
