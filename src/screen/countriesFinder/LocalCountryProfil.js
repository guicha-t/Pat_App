import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Alert, Button, AsyncStorage} from 'react-native';
import { observer } from 'mobx-react';
import {Header} from 'react-native-elements'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';


import Store from './../../global/store/Store'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

@observer
export default class LocalCountryProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalData: [],
    };
  }

  componentDidMount() {
      this.PrintData()
  }

  PrintData() {
    this.retrieveItem("LocalData").then((goals) => {
        //this callback is executed when your Promise is resolved
        console.log(goals)
        this.setState({"LocalData":goals})
        }).catch((error) => {
        //this callback is executed when your Promise is rejected
        console.log('Promise is rejected with error: ' + error);
        });
  }

  async retrieveItem(key) {
      try {
        const retrievedItem =  await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
      } catch (error) {
        console.log(error.message);
      }
      return
    }

    checkDataDownloaded() {
      if (this.state.LocalData == null) {
        return (
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text>Aucune donnée téléchargée</Text>
            <Text>Actualisez la page ou téléchargez les données.</Text>
          </View>
        )
      } else {
        return (
          this.state.LocalData.map((source, i) => {
                 return (
                   <Collapse key={i}>
                     <CollapseHeader>
                       <View style={{height: 60, borderBottomWidth: 1, justifyContent:'center', paddingLeft: 20, backgroundColor:"#E0E0E0"}}>
                         <Text>{this.state.LocalData[i].nomPays}</Text>
                       </View>
                     </CollapseHeader>

                     <CollapseBody>
                      <View style={{borderBottomWidth: 1, padding: 20}}>
                        <Text style={{}}>Capitale: {this.state.LocalData[i].infPays.capitale}</Text>
                        <Text style={{}}>Climat: {this.state.LocalData[i].infPays.climat}</Text>
                        <Text style={{}}>Fuseau Horaire: {this.state.LocalData[i].infPays.decHorraire}</Text>
                        <Text style={{}}>Langue: {this.state.LocalData[i].infPays.langue}</Text>
                        <Text style={{}}>Devise: {this.state.LocalData[i].infPays.monnaie}</Text>
                        <Text style={{}}>Population: {this.state.LocalData[i].infPays.population}</Text>
                        <Text style={{}}>Superficie: {this.state.LocalData[i].infPays.superficie}</Text>
                      </View>
                     </CollapseBody>
                   </Collapse>
                 );
               })
             )
      }
    }


  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("UserProfil")}}
          centerComponent={{ text: 'DONNEES HORS-LIGNE', style: { color: '#fff'} }}
          rightComponent={{ icon: 'refresh', color: '#fff', onPress:()=>this.PrintData()}}
        />

        <ScrollView>
          {this.checkDataDownloaded()}
        </ScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


/*      */



/*
Object {
  "description": "La France, pays de l'Europe occidentale, compte des villes médiévales, des villages alpins et des plages. Paris, sa capitale, est célèbre pour ses maisons de mode, ses musées d'art classique, dont celui du Louvre, et ses monuments comme la Tour Eiffel. Le pays est également réputé pour ses vins et sa cuisine raffinée. Les peintures rupestres des grottes de Lascaux, le théâtre romain de Lyon et l'immense château de Versailles témoignent de sa riche histoire.",
  "idPays": 5,
  "infPays": Object {
    "PayIdPays": 5,
    "capitale": "Paris",
    "climat": "Océanique et méditéranéen",
    "decHorraire": "UTC+1",
    "idPays": 5,
    "langue": "Français",
    "monnaie": "l'Euro",
    "population": " 66,99M d’habitants",
    "saison": "n/a",
    "superficie": "643 801 km2",
  },
  "lat": 48.8588415,
  "lng": 2.3390333,
  "nomPays": "France",
}

Object {
  "description": "La France, pays de l'Europe occidentale, compte des villes médiévales, des villages alpins et des plages. Paris, sa capitale, est célèbre pour ses maisons de mode, ses musées d'art classique, dont celui du Louvre, et ses monuments comme la Tour Eiffel. Le pays est également réputé pour ses vins et sa cuisine raffinée. Les peintures rupestres des grottes de Lascaux, le théâtre romain de Lyon et l'immense château de Versailles témoignent de sa riche histoire.",
  "idPays": 5,
  "infPays": Object {
    "PayIdPays": 5,
    "capitale": "Paris",
    "climat": "Océanique et méditéranéen",
    "decHorraire": "UTC+1",
    "idPays": 5,
    "langue": "Français",
    "monnaie": "l'Euro",
    "population": " 66,99M d’habitants",
    "saison": "n/a",
    "superficie": "643 801 km2",
  },
  "lat": 48.8588415,
  "lng": 2.3390333,
  "nomPays": "France",
}
*/
