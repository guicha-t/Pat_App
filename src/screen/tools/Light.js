import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Header, Input, Button, SearchBar, Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Expo, { Constants } from 'expo';
import { Magnetometer } from 'expo-sensors';

import { Text, View, Animated, Easing, StyleSheet,ImageBackground, Alert} from 'react-native';

import Store from './../../global/store/Store'

@observer
export default class Light extends Component {

  constructor(props) {
    super(props);
    this.state = {
      v: null,
    };
  }


  componentDidMount() {
    Magnetometer.addListener(v => {
      this.setState({ v });
      console.log(v)
    });
  }


  getBack = () => {
    Magnetometer.removeAllListeners()
    this.props.navigation.navigate("MainMenu")
  }

  render() {

    let theta = 0;
    if (this.state.v) {
      let { x, y, z } = this.state.v;

      theta = Math.atan(-x / y);
      if (y > 0 && -x > 0) {
        //
      } else if (y < 0) {
        theta += Math.PI;
      } else {
        theta += Math.PI * 2;
      }
    }

    let rotatedStyle = {transform: [{rotate: -theta}]};

    return (
       <View style={styles.container}>
         <Header
           containerStyle={{
             backgroundColor: '#428B9D',
           }}
           leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.getBack() }}
           centerComponent={{ text: 'BOUSSOLE', style: { color: '#fff' } }}
           rightComponent={{ icon: 'settings', color: '#fff' , onPress:()=>this.props.navigation.navigate('UserProfil') }}
         />
         <View style={styles.containerCompass}>
           <ImageBackground
             source={require('../../assets/compass/compass.png')}
             style={[
               {
                 height: 420,
                 width: 420,
                 alignItems: 'center',
                 justifyContent: 'center',
               },
             ]}>
             <Image
               source={require('../../assets/compass/arrow.png')}
               style={[
                 {
                   height: 320,
                   width: 320,
                   opacity: 0.3,
                 },
                 rotatedStyle,
               ]}
             />
           </ImageBackground>
         </View>
       </View>
     );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCompass: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
