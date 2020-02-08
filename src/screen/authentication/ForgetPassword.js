import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { observer } from 'mobx-react';

import Store from './../../global/store/Store'

@observer
export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ForgetPassword</Text>
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
