import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, ScrollView} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Button} from 'react-native-elements'

import {
  SelectMultipleButton,
  SelectMultipleGroupButton
} from "react-native-selectmultiple-button";

import Store from './../../global/store/Store'

const ios_blue = "#428B9D";
import _ from "lodash";
const multipleContinents = ["Ne pas préciser", "Afrique", "Amérique du Nord", "Amérique du Sud", "Asie", "Europe", "Océanie"];
const multipleClimats = ["Ne pas préciser", "continental", "méditéranéen", "océanique", "subtropical", "tropical"];


@observer
export default class DestinationFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleSelectedData: [],
      continent_selected: "Ne pas préciser",
      climat_selected: "Ne pas préciser",
    };
  }

  _singleTapRadioSelectedContinent(valueTap, param) {
    this.setState({
      continent_selected: param,
    });
  }

  _singleTapRadioSelectedClimat(valueTap, param) {
    this.setState({
      climat_selected: param,
    });
  }

  gotoResults() {

    var conditionnalBody = "";
    if (this.state.climat_selected != "Ne pas préciser" && this.state.continent_selected != "Ne pas préciser") {
      conditionnalBody = JSON.stringify({continent:this.state.continent_selected, climat:this.state.climat_selected})
    } else if (this.state.continent_selected != "Ne pas préciser") {
      conditionnalBody = JSON.stringify({continent:this.state.continent_selected})
    } else if (this.state.climat_selected != "Ne pas préciser") {
      conditionnalBody = JSON.stringify({climat:this.state.climat_selected})
    } else {
      conditionnalBody = JSON.stringify({})
    }

    fetch('http://193.70.90.162/finder/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + Store.UserToken,
      },
      body: conditionnalBody,
    }).then(function(response) {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data]);
      }).then(([statusCode, data]) => {
        if (statusCode != 200) {
          Alert.alert(data.message)
        } else {
          Store.setResultsFinder(data)
          this.props.navigation.navigate("DestinationFinderResults")
        }
        console.log(statusCode)
        console.log(data)
      }).catch(error => {
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
          centerComponent={{ text: 'DENICHEUR DE DESTINATION', style: { color: '#fff'} }}
        />

        <ScrollView style={{flex: 0.9}}>


          <View style={{height: 60, backgroundColor:'#DCDCDC', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Etape 1: Sélectionner le continent</Text>
          </View>

          <View style={{flex: 0.7, padding: 20}}>
            {multipleContinents.map(continent => (
                      <SelectMultipleButton
                        key={continent}
                        value={continent}
                        displayValue={continent}
                        highLightStyle={{
                          borderColor: "gray",
                          backgroundColor: "transparent",
                          textColor: "gray",
                          borderTintColor: "#428B9D",
                          backgroundTintColor: "#428B9D",
                          textTintColor: "white"
                        }}
                        selected={this.state.continent_selected === continent}
                        singleTap={valueTap =>
                          this._singleTapRadioSelectedContinent(valueTap, continent)
                        }
                      />
                    ))}
          </View>
          <View style={{height: 60, backgroundColor:'#DCDCDC', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Etape 2: Sélectionner le climat</Text>
          </View>

          <View style={{flex: 0.7, padding: 20}}>
            {multipleClimats.map(climat => (
                      <SelectMultipleButton
                        key={climat}
                        value={climat}
                        displayValue={climat}
                        highLightStyle={{
                          borderColor: "gray",
                          backgroundColor: "transparent",
                          textColor: "gray",
                          borderTintColor: "#428B9D",
                          backgroundTintColor: "#428B9D",
                          textTintColor: "white"
                        }}
                        selected={this.state.climat_selected === climat}
                        singleTap={valueTap =>
                          this._singleTapRadioSelectedClimat(valueTap, climat)
                        }
                      />
                    ))}
          </View>
        </ScrollView>

        <View style={{flex: 0.1, backgroundColor:'#428B9D'}}>
          <Button
            buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
            disabled={Store.IsLog === 1 ? false : true}
            title= "RECHERCHER"
            onPress={()=>{this.gotoResults()}}
            />
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
