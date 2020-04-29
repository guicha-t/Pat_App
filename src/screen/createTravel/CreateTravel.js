import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, Picker, Alert} from 'react-native';
import { observer } from 'mobx-react';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {Header} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import Store from './../../global/store/Store'


@observer
export default class createTravel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Countries: [],
      currentCountry: 'Selectionne une destination',
      currentId: "",

      StartDate: "",
      EndDate: "",

      Participant: 1,
      labelParticipant: 'participant',

      currencies: [{"currency":"1","currencyLabel":"Professionnel"},
                  {"currency":"2","currencyLabel":"Détente"},
                  {"currency":"3","currencyLabel":"Touristique"},
                  {"currency":"4","currencyLabel":"Autre"}],
      currentLabel: "Select your currency",
      currency: "",
    };
    this.onDateChange = this.onDateChange.bind(this);
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
           this.setState({'Countries':data})
         }
       })
       .catch(error => {
         console.error(error);
         return { name: "network error", description: "" };
       });
  }


  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({'EndDate':moment(date).format('MM/DD/YYYY')});
    } else {
      this.setState({'StartDate':moment(date).format('MM/DD/YYYY')});
      this.setState({'EndDate':null});
    }
  }

  pickerChange(index){
   this.state.Countries.map( (v,i)=>{
    if( index === i ){
      this.setState({
      currentCountry: this.state.Countries[index].nomPays,
      currentId: this.state.Countries[index].idPays
     })
    }
   })
  }

  pickerChangeType(index){
   this.state.currencies.map( (v,i)=>{
    if( index === i ){
      this.setState({
      currentLabel: this.state.currencies[index].currencyLabel,
      currency: this.state.currencies[index].currency
     })
    }
   })
  }

  decreaseParticipant() {
    if (this.state.Participant > 1) {
      this.setState({'Participant':this.state.Participant-1})
    }
    if (this.state.Participant - 1 > 1) {
      this.setState({'labelParticipant':'participants'})
    } else {
      this.setState({'labelParticipant':'participant'})
    }
  }

  increaseParticipant() {
    this.setState({'Participant':this.state.Participant+1})
    if (this.state.Participant + 1 > 1) {
      this.setState({'labelParticipant':'participants'})
    } else {
      this.setState({'labelParticipant':'participant'})
    }
  }

  saveAndQuit() {
    Alert.alert(this.state.currentId + " " + this.state.StartDate + " " + this.state.EndDate + " " +this.state.currentLabel)
    fetch('http://193.70.90.162/trips/createTrip', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + Store.UserToken,
      },
      body: JSON.stringify({
        idPays: this.state.currentId,
        dateDepart: this.state.StartDate,
        dateRetour: this.state.EndDate,
        TypeVoyage: this.state.currentLabel,
        nbPersonnes: this.state.Participant,
      }),
    }).then(response => {
          console.log(JSON.stringify(response))
         const statusCode = response.status;
         if (statusCode == 200) {
           const data = response.json();
           return Promise.all([statusCode, data]);
         } else {
           return Promise.all([statusCode]);
         }
       })
       .then(([res, data]) => {
         console.log(res);
         if (data == null) {
           Alert.alert("Echec lors de la création d'un voyage")
         } else {
           this.setConnexion(this.state.courrielCr, this.state.passwordCr)
           Alert.alert(JSON.stringify(data))
         }
       })
       .catch(error => {
         console.error(error);
         return { name: "network error", description: "" };
       });
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;

    const minDate = new Date();
    const maxDate = new Date(2050, 31, 12);

    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'home', color: '#fff', onPress:()=>this.props.navigation.navigate("MainMenu") }}
          centerComponent={{ text: 'CREATION DE VOYAGE', style: { color: '#fff'} }}
          rightComponent={{ icon: 'settings', color: '#fff', onPress:()=>this.props.navigation.navigate('UserProfil') }}
        />

        <View style={styles.body}>
          <View style={{borderWidth: 2, borderColor: "#428B9D", margin: 10, marginTop: 20}}>
            <Picker
            selectedValue={this.state.currentId }
            onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}
            >
              {this.state.Countries.map( (v)=>{
               return <Picker.Item label={v.nomPays} value={v.idPays} key={v.nomPays}/>
              })}
            </Picker>
          </View>
          <View style={{marginLeft: 10, marginRight: 10, paddingBottom: 20, borderWidth: 2, borderColor: "#428B9D"}}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#CDCDCD"
              selectedDayColor="#428B9D"
              selectedDayTextColor="#FFFFFF"
              onDateChange={this.onDateChange}
              nextTitle="Mois Suivant"
              previousTitle="Mois Précedent"
            />
          </View>
          <View style={{borderWidth: 2, borderColor: "#428B9D", margin: 10, flexDirection: 'row', height: 56}}>
            <TouchableOpacity style={{flex: 0.2, alignItems:'center', justifyContent:'center'}} onPress={() => this.decreaseParticipant()}>
              <Image source={require('./../../assets/createTravel/minus.png')} style={{width:40, height:40}}/>
            </TouchableOpacity>
            <View style={{flex: 0.6, alignItems:'center', justifyContent:'center'}}>
              <Text>{this.state.Participant} {this.state.labelParticipant}</Text>
            </View>
            <TouchableOpacity style={{flex: 0.2, alignItems:'center', justifyContent:'center'}} onPress={() => this.increaseParticipant()}>
              <Image source={require('./../../assets/createTravel/plus.png')} style={{width:40, height:40}}/>
            </TouchableOpacity>
          </View>

          <View style={{borderWidth: 2, borderColor: "#428B9D", marginLeft: 10, marginRight: 10}}>
            <Picker
            selectedValue={this.state.currency }
            onValueChange={(itemValue, itemIndex) => this.pickerChangeType(itemIndex)}>{
              this.state.currencies.map( (v)=>{
               return <Picker.Item label={v.currencyLabel} value={v.currency}  key={v.currency}/>
              })
             }
            </Picker>
          </View>
          <Text>idPays: {this.state.currentId}</Text>
          <Text>dateDepart: {this.state.StartDate}</Text>
          <Text>dateRetour: {this.state.EndDate}</Text>
          <Text>TypeVoyage: {this.state.currentLabel}</Text>
          <Text>nbPersonnes: {this.state.Participant}</Text>




        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.saveAndQuit()}>
              <Image source={require('./../../assets/createTravel/save.png')} style={{width:40, height:40}}/>
            </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  body: {
    flex: 1,
  },
  footer: {
    height: 56,
    backgroundColor: '#428B9D',
    alignItems:'center',
    justifyContent:'center',
  },
});
