import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Alert} from 'react-native';
import call from 'react-native-phone-call';
import Modal from 'react-native-modalbox';
import { observer } from 'mobx-react';
import {Header, Button} from 'react-native-elements'
import Store from './../../global/store/Store'

var screen = Dimensions.get('window');

@observer
export default class ToolsMenu extends Component {

  constructor() {
    super();
    this.state = {
      countryName: Store.CurrentCountry,
      isOpen: true,
      swipeToClose: true,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>

        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("MainMenu") }}
          centerComponent={{ text: 'OUTILS', style: { color: '#fff'} }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
        />
        <View style={styles.Body}>
          <View style={styles.topContainer}>
            <Image
              style={{flex: 1, height: undefined, width: undefined, margin: 60}}
              source={require('./../../assets/toolbox.png')}
              resizeMode="contain"
              />
          </View>

          <View style={{flex: 0.6}}>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="METEO"
                onPress={()=>{this.props.navigation.navigate('Meteo')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="LAMPE TORCHE"
                onPress={()=>{this.props.navigation.navigate('Meteo')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="MA POSITION GPS"
                onPress={()=>{this.props.navigation.navigate('Meteo')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="BOUSSOLE"
                onPress={()=>{this.props.navigation.navigate('Meteo')}}
                />
            </View>
            <View style={styles.buttonContainer}>
            
            </View>


          </View>
          <View style={{flex: 0.1}}>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Body: {
    flex: 1,
  },
  topContainer: {
    flex: 0.3,
  },
  buttonContainer: {
    flex: 0.2,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
