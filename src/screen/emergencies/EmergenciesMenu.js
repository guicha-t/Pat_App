import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, Image, TouchableOpacity,ListItem, ScrollView, Dimensions, FlatList, Alert, Picker} from 'react-native';
import call from 'react-native-phone-call';
import { observer } from 'mobx-react';
import {Header, Button} from 'react-native-elements'
import Store from './../../global/store/Store'


var data = [
  {country: 'Allemagne', capitale: 'Berlin', police: '50', firefighter: '60', rescue: '70', poison: '80', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'France', capitale: 'Paris', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Italie', capitale: 'Rome', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Espagne', capitale: 'Madrid', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Portugal', capitale: 'Lisbonne', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Suisse', capitale: 'Genève', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Angleterre', capitale: 'Londres', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Irlande', capitale: 'Dublin', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Islande', capitale: 'pyat', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Pays-bas', capitale: 'Amsterdam', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Allemagne', capitale: 'Berlin', police: '50', firefighter: '60', rescue: '70', poison: '80', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'France', capitale: 'Paris', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Italie', capitale: 'Rome', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Espagne', capitale: 'Madrid', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Portugal', capitale: 'Lisbonne', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Suisse', capitale: 'Genève', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Angleterre', capitale: 'Londres', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Irlande', capitale: 'Dublin', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Islande', capitale: 'pyat', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Allemagne', capitale: 'Berlin', police: '50', firefighter: '60', rescue: '70', poison: '80', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'France', capitale: 'Paris', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Italie', capitale: 'Rome', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Espagne', capitale: 'Madrid', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Portugal', capitale: 'Lisbonne', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Suisse', capitale: 'Genève', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Angleterre', capitale: 'Londres', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Irlande', capitale: 'Dublin', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},
  {country: 'Islande', capitale: 'pyat', police: '01', firefighter: '02', rescue: '03', poison: '04', urlFlag: 'https://cdn.countryflags.com/thumbs/france/flag-800.png'},

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
          rightComponent={{ icon: 'settings', color: '#fff', onPress:() => this.props.navigation.navigate("UserProfil")}}
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
            Alert.alert('Modal has been closed.');
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
                      <Image style={styles.picture} source={{uri: item.urlFlag}}/>
                    </View>
                    <View style={{flex: 0.9, justifyContent:'center'}}>
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
