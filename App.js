import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Provider} from 'mobx-react';

import DrawerMenu from './src/global/navigation/DrawerMenu';


import Store from './src/global/store/Store';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider Store={Store}>
        <DrawerMenu />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
