import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider} from 'mobx-react';

import Navigator from './src/routes/Drawer'

import Store from './src/global/store/Store';

export default function App() {
console.disableYellowBox = true;
  return (
       <Provider Store={Store}>
          <Navigator/>
      </Provider>
  );
}
