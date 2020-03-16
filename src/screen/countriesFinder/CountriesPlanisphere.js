import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements'
import { observer } from 'mobx-react';
import MapView from 'react-native-maps';

import Store from './../../global/store/Store'

@observer
export default class CountriesPlanisphere extends Component {
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
          centerComponent={{ text: 'PLANISPHERE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
        />
        <View style={styles.bodyContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: 20.78825,
            longitude: 16.4324,
            latitudeDelta: 100.0,
            longitudeDelta: 100.0,
          }}>

            <MapView.Marker
              coordinate={{
              latitude: 47.082892,
              longitude: 2.396577999999977}}
              pinColor={'tan'}
              onPress={() => this.props.navigation.navigate('CountryProfil', {itemId: 1})}
              image = {require('../../assets/flagMarker/france.png')}
            />

            <MapView.Marker
             coordinate={{
             latitude: 51.1657,
             longitude: 10.4515}}
             pinColor={'tan'}
             onPress={() => this.props.navigation.navigate('CountryProfil', {itemId: 2})}
             image = {require('../../assets/flagMarker/france.png')}
            />

          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'green'
  },
  mapContainer: {
  ...StyleSheet.absoluteFillObject,
//    height: 400,
//    width: 400,
  justifyContent: 'flex-end',
  alignItems: 'center',
},
map: {
  ...StyleSheet.absoluteFillObject,
},
});
