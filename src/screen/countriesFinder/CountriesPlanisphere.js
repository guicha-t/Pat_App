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
      Markers: [],
    };
  }

  componentDidMount() {
    fetch('http://193.70.90.162/pays', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
         const statusCode = response.status;
         if (statusCode == 200) {
           const data = response.json();
           return Promise.all([statusCode, data]);
         } else {
           return Promise.all([statusCode]);
         }
       })
       .then(([res, data]) => {
         console.log(data);
         if (data == null) {
   //        Alert.alert("Echec lors de la connexion")
         } else {
           this.setState({'Markers':data})
         }
       })
       .catch(error => {
         console.error(error);
         return { name: "network error", description: "" };
       });
  }

  goToProfilCountry(param) {
    Store.InfoCountry = param;

    fetch('http://193.70.90.162/pays/' + Store.InfoCountry, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
         const statusCode = response.status;
         if (statusCode == 200) {
           const data = response.json();
           return Promise.all([statusCode, data]);
         } else {
           return Promise.all([statusCode]);
         }
       })
       .then(([res, data]) => {
    //         console.log(data);
         if (data == null) {
    //        Alert.alert("Echec lors de la connexion")
         } else {
           Store.DataCountry = data;
           Store.KeyReturn = '2';
           this.props.navigation.navigate("CountryProfil");

         }
       })
       .catch(error => {
         console.error(error);
         return { name: "network error", description: "" };
       });
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

            {this.state.Markers.map(Marker => (
              <MapView.Marker
                coordinate={{
                  latitude: Marker.lat,
                  longitude: Marker.lng
                }}
                pinColor={'tan'}
                key={Marker.idPays}
                onPress={() => this.goToProfilCountry(Marker.idPays)}
                image = {require('../../assets/flagMarker/france.png')}
              />
            ))}

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
