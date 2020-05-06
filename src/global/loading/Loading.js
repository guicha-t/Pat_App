import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

import { observer } from 'mobx-react';

import Store from './../../global/store/Store';


@observer
export default class Loading extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <View style={[styles.loadingContainer, {backgroundColor: Store.Back}]}>
          <BarIndicator color={Store.Text2}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
