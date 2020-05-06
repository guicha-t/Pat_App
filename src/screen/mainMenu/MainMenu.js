import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, AsyncStorage, Console} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import publicIP from 'react-native-public-ip';


import * as Location from 'expo-location';

import Store from './../../global/store/Store';
import Loading from './../../global/loading/Loading';

@observer
export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Location: {},
      Lat: '',
      Lng: '',
    };
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const localEmail = await AsyncStorage.getItem('localEmail');
    const localToken = await AsyncStorage.getItem('localToken');
    const localUsername = await AsyncStorage.getItem('localUsername');
    if (localEmail != null) {
      Store.setUserToken(localToken)
      Store.setUserEmail(localEmail)
      Store.setUserUsername(localUsername)
      Store.setIsLog(1)
    }
  };

  componentDidMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({'Lat':location.coords.latitude})
    this.setState({'Lng':location.coords.longitude})
    publicIP()
      .then(ip => {
        fetch('http://api.ipstack.com/'+ ip + '?access_key=a1227cca7b943a9095682ee11d17bc5f&format=1', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
            .then((responseJson) => {
              Store.setCurrentLocation(responseJson.city,responseJson.country_name,responseJson.country_code,this.state.Lat,this.state.Lng)
              this.setState({'loading':false})
            })
            .catch((error) => {
              console.error(error);
            });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading) {
        return (
          <Loading navigation={this.props.navigation}/>
        )
      }
    return (
      <View style={{flex:1}}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'menu', color: '#fff', onPress:()=>this.props.navigation.openDrawer() }}
          centerComponent={{ text: 'PICK A TRIP', style: { color: '#fff' } }}
          rightComponent={{ icon: 'person-pin-circle', color: '#fff' , onPress:()=>this.props.navigation.navigate('UserProfil') }}
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
                disabled={Store.IsLog === 1 ? false : true}
                title="CREATION DE VOYAGE"
                onPress={()=>{this.props.navigation.navigate('CreateTravel')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                disabled={Store.IsLog === 1 ? false : true}
                title="DENICHEUR DE DESTINATION"
                onPress={()=>{this.props.navigation.navigate('UserProfil')}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
                disabled={Store.IsLog === 1 ? false : true}
                title="OUTILS"
                onPress={()=>{this.props.navigation.navigate('ToolsMenu')}}
                />
            </View>
          </View>

          <View style={styles.emergenciesContainer}>

            <View style={{flex: 1, backgroundColor:'#D93025'}}>
              <Button
                buttonStyle={{height: '100%', backgroundColor: '#D93025'}}
                title="URGENCES"
                onPress={()=>{this.props.navigation.navigate('EmergenciesMenu')}}
                />
            </View>
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
    flex: 0.1,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 0.2,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
