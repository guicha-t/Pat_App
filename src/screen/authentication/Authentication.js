import React, { Component } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { observer } from 'mobx-react';

import Header from '../../global/header/Header'
import Store from './../../global/store/Store'

@observer
export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  GotoCreateAccount = () => {
    this.props.navigation.navigate('CreateAccount');
  }

  GotoForgetPassword = () => {
    this.props.navigation.navigate('ForgetPassword');
  }

  GotoMainMenu = () => {
    this.props.navigation.navigate('MainMenu');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Authentification</Text>
        <Button title='Se connecter' onPress={()=>{this.props.navigation.navigate('MainMenu')}}/>
        <Button title='Create account' onPress={this.GotoCreateAccount}/>
        <Button title='Forget Password ?' onPress={this.GotoForgetPassword}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
