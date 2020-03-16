import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { observer } from 'mobx-react';
import {Header} from 'react-native-elements'


import Store from './../../global/store/Store'

@observer
export default class CountriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
         console.log(JSON.stringify(response));
         if (statusCode == 200) {
           const data = response.json();
           return Promise.all([statusCode, data]);
         } else {
           return Promise.all([statusCode]);
         }
       })
       .then(([res, data]) => {
         console.log(res, data);
         if (data == null) {
   //        Alert.alert("Echec lors de la connexion")
         } else {

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
          centerComponent={{ text: 'LISTES DES PAYS', style: { color: '#fff'} }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
        />
        <View style={{flex: 1, backgroundColor:'green'}}>

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
