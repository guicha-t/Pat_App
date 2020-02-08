import React, { Component } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { observer } from 'mobx-react';

import Store from './../../global/store/Store'

@observer
export default class DestinationFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>DestinationFinder</Text>
        <Button title='Retour' onPress={()=>{this.props.navigation.navigate('MainMenuStack')}}/>
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
