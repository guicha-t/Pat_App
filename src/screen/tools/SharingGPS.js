import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import {Header} from 'react-native-elements'
import MapView from 'react-native-maps';
import * as SMS from 'expo-sms';
import * as MailComposer from 'expo-mail-composer';

import Dialog from "react-native-dialog";

import Store from './../../global/store/Store'

import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get( 'window' );
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

@observer
export default class SharingGPS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LAT: parseFloat(Store.CurrentLattitude),
      LNG: parseFloat(Store.CurrentLongitute),
      dialogVisible: false,
    };
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
    };

  handleSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          "",
          'Bonjour, \nVoici mes coordonnées GPS:\nLAT: ' + Store.CurrentLattitude + '\nLNG: '+ Store.CurrentLongitute + '\nVille: ' + Store.CurrentCity + '\nPays: ' + Store.CurrentCountry + '(' + Store.CurrentCountryCode + ')' + '\nMessage transmis par l\'assistant PickATrip.'
        );
      } else {
        Alert.alert("Service SMS Indisponible")
      }
  }

  handleEmail = async (param) => {
    MailComposer.composeAsync({
      recipients: [""],
      subject: 'Partage de position - PAT',
      body: 'Bonjour, \nVoici mes coordonnées GPS:\nLAT: ' + Store.CurrentLattitude + '\nLNG: '+ Store.CurrentLongitute + '\nVille: ' + Store.CurrentCity + '\nPays: ' + Store.CurrentCountry + '(' + Store.CurrentCountryCode + ')' + '\nMessage transmis par l\'assistant PickATrip.',
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("ToolsMenu") }}
          centerComponent={{ text: 'MA POSITION GPS', style: { color: '#fff'} }}
          rightComponent={{ icon: 'send', color: '#fff', onPress:()=>this.showDialog()}}
        />
        <View style={{flex: 1, backgroundColor:'blue'}}>
          <View style={{flex: 0.2, backgroundColor:'#E0E0F0', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 24}}>{Store.CurrentCity}</Text>
            <Text style={{fontSize: 20}}>{Store.CurrentCountry} ({Store.CurrentCountryCode})</Text>
            <Text style={{fontSize: 20}}>Lat: {this.state.LAT}</Text>
            <Text style={{fontSize: 20}}>Lng: {this.state.LNG}</Text>

          </View>
          <View style={{flex: 0.8, backgroundColor:'grey'}}>
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.LAT,
                longitude: this.state.LNG,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <MapView.Marker
                coordinate={{
                  latitude: this.state.LAT,
                  longitude: this.state.LNG
                }}
                title={"Title"}
              />
            </MapView>
          </View>
        </View>
        <View>



          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>PARTAGE DE POSITION</Dialog.Title>
            <Dialog.Description>
              Selectionner un service d'envoi.
            </Dialog.Description>

            <Dialog.Button label="Retour" onPress={this.handleCancel} />
            <Dialog.Button label="SMS" onPress={this.handleSMS} />
            <Dialog.Button label="Email" onPress={this.handleEmail} />
          </Dialog.Container>



        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
