import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, Platform, Linking} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
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
    }).then(function(response) {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data]);
      }).then(([statusCode, data]) => {
        if (statusCode != 200) {
          Alert.alert(data.message)
        } else {
          this.setState({'Countries':data})
        }
        console.log(statusCode)
        console.log(data)
      }).catch(error => {
         console.error(error);
     });
  }


  PrintData() {
    this.retrieveItem("LocalData").then((goals) => {
        console.log(JSON.parse(goals))
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


  goToProfilCountry(param) {
    Store.InfoCountry = param;

    fetch('http://193.70.90.162/pays/' + Store.InfoCountry, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function(response) {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data]);
      }).then(([statusCode, data]) => {
        if (statusCode != 200) {
          Alert.alert(data.message)
        } else {
          fetch('http://193.70.90.162/pays/images/' + Store.InfoCountry, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(function(response) {
              const statusCode = response.status
              const data = response.json()
              return Promise.all([statusCode, data]);
            }).then(([statusCode, data]) => {
              if (statusCode != 200) {
                Alert.alert(data.message)
              } else {
                Store.PicCountry = data
              }
              this.setState({'loading':false})
            }).catch(error => {
               console.error(error);
           });
          Store.DataCountry = data;
          console.log(data)
          Store.KeyReturn = '1';
          this.props.navigation.navigate("CountryProfil");
        }
        this.setState({'loading':false})
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
              <View style={{flex: 0.2, paddingLeft: 10, justifyContent: 'center', alignItems:'center'}}>
                <Image style={{width: 50, height: 30, borderWidth: 1, borderColor: 'black'}} source={{uri: 'http://193.70.90.162/flags/'+item.idPays+'.png'}}/>
              </View>
              <View style={{flex: 0.8, paddingLeft: 10, justifyContent: 'center'}}>
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
