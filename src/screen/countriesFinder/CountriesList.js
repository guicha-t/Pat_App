import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import { observer } from 'mobx-react';
import {Header} from 'react-native-elements'


import Store from './../../global/store/Store'

@observer
export default class CountriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Countries: [],
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

  goToProfilCountry(param) {
    Store.InfoCountry = param;

    fetch('http://193.70.90.162/pays/' + Store.InfoCountry, {
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
    //         console.log(data);
         if (data == null) {
    //        Alert.alert("Echec lors de la connexion")
         } else {
           Store.DataCountry = data;
           this.props.navigation.navigate("CountryProfil");

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
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("MainMenu")}}
          centerComponent={{ text: 'LISTES DES PAYS', style: { color: '#fff'} }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
        />
        <View style={{flex: 1}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.Countries}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => this.goToProfilCountry(item.idPays)}
              style={{flex: 1,height: 60, flexDirection:'row', justifyContent:'center', borderBottomWidth: 1, borderColor: '#DCDCDC'}}>
              <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>{item.nomPays}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={item => item.idPays.toString()}
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
