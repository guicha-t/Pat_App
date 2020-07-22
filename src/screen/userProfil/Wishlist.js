import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Alert, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import {Header} from 'react-native-elements'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

import Store from './../../global/store/Store'

const ios_blue = "#428B9D";
import _ from "lodash";


@observer
export default class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalData: Store.Wishlist,
    };
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
          Store.KeyReturn = '4';
          this.props.navigation.navigate("CountryProfil");
        }
        this.setState({'loading':false})
      }).catch(error => {
         console.error(error);
     });
  }


  removeToWhishlist(param) {
    fetch('http://193.70.90.162/wishlist/' + param, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + Store.UserToken,
      },
      body:JSON.stringify({idPays:param})
,
    }).then(function(response) {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data]);
      }).then(([statusCode, data]) => {
        if (statusCode != 200) {
          Alert.alert(data.message)
        } else {
          fetch('http://193.70.90.162/wishlist/', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: "Bearer " + Store.UserToken,
            },
          }).then(function(response) {
              const statusCode = response.status
              const data = response.json()
              return Promise.all([statusCode, data]);
            }).then(([statusCode, data]) => {
              if (statusCode != 200) {
                Alert.alert(data.message)
              } else {
                Store.setWishlist(data)
                Alert.alert("Pays retiré avec succès!")
              }
              console.log(statusCode)
              console.log(data)
            }).catch(error => {
               console.error(error);
           });
        }
        console.log(statusCode)
        console.log(data)
      }).catch(error => {
         console.error(error);
     });
  }

      checkDataDownloaded() {
        if (Store.Wishlist.length == 0) {
          return (
            <View style={{height: 100, justifyContent:'center', alignItems:'center'}}>
              <Text>Aucun pays correspondant</Text>
            </View>
          )
        } else {
          return (
            Store.Wishlist.map((source, i) => {
                   return (
                     <Collapse key={i}>
                       <CollapseHeader>
                         <View style={{height: 60, borderBottomWidth: 1, justifyContent:'center', paddingLeft: 20, backgroundColor:"#DCDCDC"}}>
                           <Text>{Store.Wishlist[i].nomPays}</Text>
                         </View>
                       </CollapseHeader>

                       <CollapseBody>
                        <View style={{borderBottomWidth: 1, padding: 20, flexDirection:'row', justifyContent:'space-around'}}>
                          <TouchableOpacity style={{alignItems:'center'}} onPress={() => this.goToProfilCountry(Store.Wishlist[i].idPays)}>
                            <Text>Fiche pays</Text>
                            <Image
                              source={require('./../../assets/countryProfil/info.png')}
                              style={{width:40, height:40}}
                              />
                          </TouchableOpacity>

                          <TouchableOpacity style={{alignItems:'center'}} onPress={() => this.removeToWhishlist(Store.Wishlist[i].idPays)}>
                            <Text>Retirer des souhaits</Text>
                            <Image
                              source={require('./../../assets/countryProfil/dislike.png')}
                              style={{width:40, height:40}}
                              />
                          </TouchableOpacity>

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
            centerComponent={{ text: 'LISTE DE SOUHAITS', style: { color: '#fff'} }}
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
