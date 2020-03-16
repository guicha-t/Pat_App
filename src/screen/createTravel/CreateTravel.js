import React, { Component } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { observer } from 'mobx-react';
import {Header} from 'react-native-elements'

import Store from './../../global/store/Store'

@observer
export default class createTravel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("MainMenu") }}
          centerComponent={{ text: 'CREATION DE VOYAGE', style: { color: '#fff'} }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
