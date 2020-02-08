import React, { Component } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={{flex:1}}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'menu', color: '#fff', onPress:()=>this.props.navigation.openDrawer() }}
          centerComponent={{ text: 'PICK A TRIP', style: { color: '#fff' } }}
          rightComponent={{ icon: 'settings', color: '#fff' , onPress:()=>this.props.navigation.navigate('UserProfil') }}
        />


        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Image
              style={{flex: 1, height: undefined, width: undefined}}
              source={require('./../../assets/logo_pat.png')}
              resizeMode="contain"
              />
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="FICHES PAYS"
                onPress={()=>{this.props.navigation.navigate('CountriesList')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="PLANISPHERE"
                onPress={()=>{this.props.navigation.navigate('CountriesPlanisphere')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="CREATION DE VOYAGE"
                onPress={()=>{this.props.navigation.navigate('CreateTravel')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="DENICHEUR DE DESTINATION"
                onPress={()=>{this.props.navigation.navigate('DestinationFinder')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                title="METEO"
                onPress={()=>{this.props.navigation.navigate('Meteo')}}
                />
            </View>

          </View>

          <View style={styles.emergenciesContainer}>
            <Button
              buttonStyle={{height: '100%', backgroundColor: '#D93025'}}
              title="URGENCES"
              onPress={()=>{this.props.navigation.navigate('EmergenciesMenu')}}
              />
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
  topContainer: {
    flex: 0.3,
  },
  bottomContainer: {
    flex: 0.6,
  },
  emergenciesContainer: {
    flex: 0.1
  },
  buttonContainer: {
    flex: 0.2,
    padding: 20,
    justifyContent:'center'
  },
});
