import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Provider} from 'mobx-react';

import Navigator from './src/routes/Drawer'

import Store from './src/global/store/Store';

export default function App() {
  return (
       <Provider Store={Store}>
        <Navigator/>
      </Provider>
  );
}
