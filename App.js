/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/store.js';
import StackNavigator from './src/navigation/StackNavigator.js';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
