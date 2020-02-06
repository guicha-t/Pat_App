import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, KeyboardAvoidingView, Dimensions} from 'react-native';
import { observer } from 'mobx-react';

import Store from './../../global/store/Store'

@observer
export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main Menu</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center',
    flex: 1,
  },
});
