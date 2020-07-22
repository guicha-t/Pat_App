import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, Image, TouchableOpacity,ListItem, ScrollView, Dimensions, FlatList, Alert, Picker} from 'react-native';
import call from 'react-native-phone-call';
import { observer } from 'mobx-react';
import {Header, Button} from 'react-native-elements'
import Store from './../../global/store/Store'


var data = [

  {country: 'ALBANIE', capitale: 'Tirana', police: '129', firefighter: '128', rescue: '127', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/albania/flag-800.png'},
  {country: 'ALLEMAGNE', capitale: 'Berlin', police: '110', firefighter: '112', rescue: '112', poison: '19240', urlFlag: 'https://cdn.countryflags.com/thumbs/germany/flag-800.png'},
  {country: 'ANDORRE', capitale: 'Andorra la Vella', police: '110', firefighter: '118', rescue: '116', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/andorra/flag-800.png'},
  {country: 'AUTRICHE', capitale: 'Vienna', police: '133', firefighter: '122', rescue: '144', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/austria/flag-800.png'},
  {country: 'BELGIQUE', capitale: 'Bruxelles', police: '101', firefighter: '112', rescue: '112', poison: '070245245', urlFlag: 'https://cdn.countryflags.com/thumbs/belgium/flag-800.png'},
  {country: 'BIELORUSSIE', capitale: 'Minsk', police: '102', firefighter: '101', rescue: '103', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/belarus/flag-800.png'},
  {country: 'BULGARIE', capitale: 'Sofia', police: '166', firefighter: '112', rescue: '150', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/bulgaria/flag-800.png'},
  {country: 'CROATIE', capitale: 'Zagreb', police: '+385192', firefighter: '+385193', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/croatia/flag-800.png'},
  {country: 'DANEMARK', capitale: 'Copenhague', police: '112', firefighter: '112', rescue: '1813', poison: '82121212', urlFlag: 'https://cdn.countryflags.com/thumbs/denmark/flag-800.png'},
  {country: 'ESPAGNE', capitale: 'Madrid', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/spain/flag-800.png'},
  {country: 'ESTONIE', capitale: 'Tallinn', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/estonia/flag-800.png'},
  {country: 'FINLANDE', capitale: 'Helsinki', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/finland/flag-800.png'},
  {country: 'FRANCE', capitale: 'Paris', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'GRECE', capitale: 'Athènes', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/greece/flag-800.png'},
  {country: 'GEORGIE', capitale: 'Tiflis', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/georgia/flag-800.png'},
  {country: 'HONGRIE', capitale: 'Budapest', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/hungary/flag-800.png'},
  {country: 'IRLANDE', capitale: 'Dublin', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/ireland/flag-800.png'},
  {country: 'ISLANDE', capitale: 'Reykjavik', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/iceland/flag-800.png'},
  {country: 'ITALIE', capitale: 'Rome', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/italy/flag-800.png'},
  {country: 'KOSOVO', capitale: 'Pristina', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/kosovo/flag-800.png'},
  {country: 'LETTONIE', capitale: 'Riga', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/latvia/flag-800.png'},
  {country: 'LIECHTENSTEIN', capitale: 'Vaduz', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/liechtenstein/flag-800.png'},
  {country: 'LITUANIE', capitale: 'Vilnius', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/lithuania/flag-800.png'},
  {country: 'LUXEMBOURG', capitale: 'Luxembourg', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/luxembourg/flag-800.png'},
  {country: 'MACEDOINE', capitale: 'Skopje', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/macedonia/flag-800.png'},
  {country: 'MALTE', capitale: 'Valletta', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/malta/flag-800.png'},
  {country: 'MOLDAVIE', capitale: 'Chisinau', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/moldova/flag-800.png'},
  {country: 'MONACO', capitale: 'Monaco', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/monaco/flag-800.png'},
  {country: 'MONTENEGRO', capitale: 'Podgorica', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/montenegro/flag-800.png'},
  {country: 'NORVEGE', capitale: 'Oslo', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/norway/flag-800.png'},
  {country: 'PAYS-BAS', capitale: 'Amsterdam', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/netherlands/flag-800.png'},
  {country: 'POLOGNE', capitale: 'Varsovie', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/poland/flag-800.png'},
  {country: 'PORTUGAL', capitale: 'Lisbonne', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/portugal/flag-800.png'},
  {country: 'ROUMANIE', capitale: 'Bucarest', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/romania/flag-800.png'},
  {country: 'ROYAUME-UNI', capitale: 'Londres', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/united-kingdom/flag-800.png'},
  {country: 'SAINT-MARIN', capitale: 'Saint-marin', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/san-marino/flag-800.png'},
  {country: 'SERBIE', capitale: 'Belgrade', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/serbia/flag-800.png'},
  {country: 'SLOVAQUIE', capitale: 'Bratislava', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/slovakia/flag-800.png'},
  {country: 'SLOVENIE', capitale: 'Ljubljana', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/slovenia/flag-800.png'},
  {country: 'SUEDE', capitale: 'Stockholm', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/sweden/flag-800.png'},
  {country: 'SUISSE', capitale: 'Bern', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/switzerland/flag-800.png'},
  {country: 'UKRAINE', capitale: 'Kiev', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/ukraine/flag-800.png'},
  {country: 'VATICAN', capitale: 'Vatican', police: '112', firefighter: '112', rescue: '112', poison: '112', urlFlag: 'https://cdn.countryflags.com/thumbs/vatican-city/flag-800.png'},
];

var screen = Dimensions.get('window');

@observer
export default class EmergenciesMenu extends Component {

  constructor() {
    super();
    this.state = {
      countryName: Store.CurrentCountry,
      isModalVisible: false
    };
  }

  toggleModal = () => {
     this.setState({ isModalVisible: !this.state.isModalVisible });
   };

  findPoliceNum = () => {
    var position = this.state.countryName;
    var newdata=data.filter(function(element){
       return element.country==position;
    }).map(function(element){
        const args = {
          number: element.police,
          prompt: true
        }
        call(args).catch(console.error)
        return element;
    });
  }

  findFireNum = () => {
    var position = this.state.countryName;
    var newdata=data.filter(function(element){
       return element.country==position;
    }).map(function(element){
        const args = {
          number: element.firefighter,
          prompt: true
        }
        call(args).catch(console.error)
        return element;
    });
  }

  findRescueNum = () => {
    var position = this.state.countryName;
    var newdata=data.filter(function(element){
       return element.country==position;
    }).map(function(element){
        const args = {
          number: element.rescue,
          prompt: true
        }
        call(args).catch(console.error)
        return element;
    });
  }

  findPoisonNum = () => {
    var position = this.state.countryName;
    var newdata=data.filter(function(element){
       return element.country==position;
    }).map(function(element){
      const args = {
        number: element.poison,
        prompt: true
      }
      call(args).catch(console.error)
      return element;
    });
  }


  changeCountry = (param) => {
    this.toggleModal()
    this.setState({
      countryName: param,
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
          centerComponent={{ text: 'URGENCES', style: { color: '#fff'} }}
        />



        <View style={styles.Body}>
          <View style={styles.topBody}>
            <Text style={styles.topBodyText}>Localisation</Text>
            <Text style={styles.topBodyTextCountry}>{this.state.countryName}</Text>
          </View>

          <View style={styles.buttonBody}>
            <View style={styles.firstRow}>

              <TouchableOpacity style={[styles.button, styles.buttonPolice]} onPress={this.findPoliceNum}>
                <Image source={require('./../../assets/police.png')} style={{width:48, height:48}}/>
                <Text style={styles.topBodyText}>Police</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.buttonPompier]} onPress={this.findFireNum}>
                <Image source={require('./../../assets/fire.png')} style={{width:48, height:48}}/>
                <Text style={styles.topBodyText}>Pompiers</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.secondRow}>

              <TouchableOpacity style={[styles.button, styles.buttonSamu]} onPress={this.findRescueNum}>
                <Image source={require('./../../assets/health.png')} style={{width:48, height:48}}/>
                <Text style={styles.topBodyText}>Premiers</Text>
                <Text style={styles.topBodyText}>secours</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.buttonPoison]} onPress={this.findPoisonNum}>
                  <Image source={require('./../../assets/toxic.png')} style={{width:48, height:48}}/>
                  <Text style={styles.topBodyText}>Centre</Text>
                  <Text style={styles.topBodyText}>anti-poison</Text>
              </TouchableOpacity>


            </View>
          </View>

          <View style={styles.bottomBody}>

            <Button
              buttonStyle={{backgroundColor: '#428B9D'}}
              title="CHANGER DE PAYS"
              onPress={()=>{this.toggleModal()}}
              />


          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          presentationSheet={'pageSheet'}
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            this.toggleModal()
          }}>
            <View style={{flex: 1, backgroundColor:'#428B9D'}}>
              <FlatList
               data={data}
               renderItem={
                 ({item}) =>
                 <TouchableOpacity
                   onPress={() => this.changeCountry(item.country)}
                   underlayColor='#FFF'>
                   <View style={{backgroundColor:'#FAFAFA', flexDirection: 'row', margin: 2, height: 48}}>
                    <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                      <Image style={styles.picture} source={{uri:item.urlFlag}}/>
                    </View>
                    <View style={{flex: 0.8, justifyContent:'center'}}>
                      <Text style={styles.primaryText}>{item.country}</Text>
                      <Text style={styles.secondaryText}>{item.capitale}</Text>
                    </View>
                   </View>
                 </TouchableOpacity>
               }
               keyExtractor={(item, index) => index.toString()}
               />
            </View>
          </Modal>


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
  topBody: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBodyText: {
    fontSize: 16,
  },
  topBodyTextCountry: {
    fontSize: 42,
    fontWeight: "bold",
  },
  buttonBody: {
    flex: 0.5,
  },
  firstRow: {
    flex: 1,
    flexDirection: 'row',
  },
  secondRow: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonPolice: {
    backgroundColor: '#81D4FA',
    marginLeft: 10,
    borderWidth: 4,

  },
  buttonPompier: {
    backgroundColor: '#ef9a9a',
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 4,

  },
  buttonSamu: {
    backgroundColor: '#FFF59D',
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 4,
  },
  buttonPoison: {
    borderWidth: 4,
    backgroundColor: '#B39DDB',
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
  },

  bottomBody: {
    flex: 0.2,
    justifyContent:'flex-end',
  },
  modal: {
    height: 300,
  },
  row: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: '#ECEFF1'
  },
  imageContainer: {
    backgroundColor: '#787878',
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    marginRight: 18,
  },
  picture: {
    width: 50,
    height: 30,
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginBottom: 4
  },
  secondaryText: {
    color: "grey",
  }

});
