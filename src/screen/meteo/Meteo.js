import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Input, Button, SearchBar, Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import Store from './../../global/store/Store'

@observer
export default class Meteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response:"First call",
      Search: '',
      rCity: '',
      rRegion: '',
      rCountry: '',
      rDegrees: '',
      rIcon: 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png',
      rDescription: '',
      rWind: '',
      rWindDir: '',
      colorText: '#FFF',
      colorContainer: '#FFF'
    };
  }


  componentDidMount() {
      if (Store.CurrentCity != '') {
        fetch('https://api.weatherstack.com/current?access_key=cf11288b984bbe9c070bbd3c6a7d63e2&query=' + Store.CurrentCity +'&language=fr', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
            .then((responseJson) => {

              if (responseJson.success == false) {
                Alert.alert("echec")
              } else {
                this.setState({'Search':Store.CurrentCity});
                this.setState({'rCity':responseJson.location.name});
                this.setState({'rRegion':responseJson.location.region+','});
                this.setState({'rCountry':responseJson.location.country});
                this.setState({'rDegrees':responseJson.current.temperature});
                this.setState({'rDescription':responseJson.current.weather_descriptions});
                this.setState({'rWind':responseJson.current.wind_speed});
                this.setState({'rWindDir':responseJson.current.wind_dir});
                this.setState({'colorText':'black'});
                this.setState({'colorContainer':'#C5C5C5'});
              }
            })
            .catch((error) => {
              console.error(error);
            });
      }
  }

  callMeteoApi = () => {
    fetch('https://api.weatherstack.com/current?access_key=cf11288b984bbe9c070bbd3c6a7d63e2&query=' + this.state.Search+'&language=fr', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.success == false) {
            Alert.alert("echec")
          } else {
            this.setState({'response':responseJson});
            this.setState({'rCity':responseJson.location.name});
            this.setState({'rRegion':responseJson.location.region+','});
            this.setState({'rCountry':responseJson.location.country});
            this.setState({'rDegrees':responseJson.current.temperature});
            this.setState({'rDescription':responseJson.current.weather_descriptions});
            this.setState({'rWind':responseJson.current.wind_speed});
            this.setState({'rWindDir':responseJson.current.wind_dir});
            this.setState({'colorText':'black'});
            this.setState({'colorContainer':'#C5C5C5'});
          }
        })
        .catch((error) => {
          console.error(error);
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
          centerComponent={{ text: 'METEO', style: { color: '#fff'} }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
        />
        <View style={{flex: 1}}>
          <View style={{flex: 0.1, flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
            <View style={{flex: 0.8, justifyContent:'center'}}>
              <Input
                 placeholder="Rechercher"
                 onChangeText={(Search) => this.setState({ Search })}
                 value={this.state.Search}
               />

            </View>
            <View style={{flex: 0.2, justifyContent:'center'}}>
            <Button
              buttonStyle={{backgroundColor:'#428B9D'}}
              onPress={()=>{this.callMeteoApi()}}
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                />
              }
              title=""
              />
            </View>

          </View>
          <View style={{flex: 0.9, paddingLeft: 40, paddingRight: 40}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize: 24}}>{this.state.rCity}</Text>
              <Text style={{fontSize: 20}}>{this.state.rRegion} {this.state.rCountry}</Text>
            </View>
            <View style={{flex: 0.4, backgroundColor:this.state.colorContainer, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize: 20, color: this.state.colorText}}>Aujourd'hui</Text>
              <Text style={{fontSize: 36, color: this.state.colorText}}>{this.state.rDegrees}°c</Text>
              <Text style={{fontSize: 20}}>{this.state.rDescription}</Text>


              <Text style={{fontSize: 20, color: this.state.colorText}}>Vitesse du vent: {this.state.rWind}km/h</Text>
              <Text style={{fontSize: 20, color: this.state.colorText}}>Direction du vent: {this.state.rWindDir}</Text>

            </View>
            <View style={{flex: 0.4}}>

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
});
