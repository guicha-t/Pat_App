import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Input, Button, SearchBar} from 'react-native-elements'
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
      rIcon: 'https://qph.fs.quoracdn.net/main-qimg-a477b86f6aa9c1767332eae705e2fdb8',
      rDescription: '',
      rWind: '',
      rWindDir: '',
      colorText: '#FFF',
      colorContainer: '#FFF'
    };
  }


  componentDidMount() {
      if (Store.CurrentCity != '') {
        fetch('http://api.weatherstack.com/current?access_key=36398a681ab7ca7c0f38bc56bce44cd2&query=' + Store.CurrentCity, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
            .then((responseJson) => {

              if (responseJson.success == false) {
                Alert.alert("Module météo indisponible")
              } else {
                this.setState({'Search':Store.CurrentCity});
                this.setState({'rCity':responseJson.location.name});
                this.setState({'rRegion':responseJson.location.region+','});
                this.setState({'rCountry':responseJson.location.country});
                this.setState({'rDegrees':responseJson.current.temperature});
                this.setState({'rDescription':responseJson.current.weather_descriptions});
                this.setState({'rIcon':responseJson.current.weather_icons[0]});
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
    fetch('http://api.weatherstack.com/current?access_key=36398a681ab7ca7c0f38bc56bce44cd2&query=' + this.state.Search, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.success == false) {
            Alert.alert("Module météo indisponible")
          } else {
            this.setState({'response':responseJson});
            this.setState({'rCity':responseJson.location.name});
            this.setState({'rRegion':responseJson.location.region+','});
            this.setState({'rCountry':responseJson.location.country});
            this.setState({'rDegrees':responseJson.current.temperature});
            this.setState({'rDescription':responseJson.current.weather_descriptions});
            this.setState({'rIcon':responseJson.current.weather_icons[0]});
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
              <Text style={{fontSize: 20, color: this.state.colorText}}>Maintenant</Text>

            </View>
            <View style={{flex: 0.4, backgroundColor:this.state.colorContainer, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize: 36, color: this.state.colorText}}>{this.state.rDegrees}°c</Text>
              <Text style={{fontSize: 20}}>{this.state.rDescription}</Text>
              <Image
                style={{height: 50, width: 50}}
                source={{uri: this.state.rIcon}}
              />
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
