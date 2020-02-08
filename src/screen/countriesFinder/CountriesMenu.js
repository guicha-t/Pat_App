import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import { observer } from 'mobx-react';
import {Header, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



import Store from './../../global/store/Store'

@observer
export default class CountriesMenu extends Component {
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
          centerComponent={{ text: 'FICHES PAYS', style: { color: '#fff' } }}
          rightComponent={{ icon: 'settings', color: '#fff', onPress:()=>this.props.navigation.navigate("UserProfil") }}
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
