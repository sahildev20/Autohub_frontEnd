/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/store.js';
import TabNavigator from './src/navigation/TabNavigator.js';

const App = () => {
  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
};

export default App;
