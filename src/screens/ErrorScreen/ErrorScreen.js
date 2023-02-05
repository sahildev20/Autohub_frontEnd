import {View, Text} from 'react-native';
import React from 'react';

function ErrorScreen({errorMessage}) {
  return (
    <View>
      <Text>ErrorScreen</Text>
      <Text>{`an error occured ${errorMessage}`}</Text>
    </View>
  );
}

export default ErrorScreen;
