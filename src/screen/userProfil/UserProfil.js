import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Alert, AlertIOS, ToastAndroid, Platform, AsyncStorage, FlatList} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Button, Input, Icon, Avatar} from 'react-native-elements'

import Store from './../../global/store/Store'

@observer
export default class UserProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalConnexionVisible : false,
      isModalCreationVisible : false,

      courrielCo: 'bill@gmail.com',
      passwordCo: 'didier',

      usernameCr: '',
      passwordCr: '',
      courrielCr: 'bill@gmail.com',

      trips: [],
    };
  }

    getFirstCharUsername() {
      return (Store.UserUsername.charAt(0).toUpperCase());
    }

  contentOfBody(){
      if (!Store.IsLog) {
        return (
          <View style={{flex: 1, backgroundColor: '#FFF', padding: 20}}>
            <View style={{flex: 0.4, justifyContent:'center', alignItems:'center', borderColor: '#428B9D', borderWidth: 2}}>
              <Input
                placeholder='Email'
                containerStyle={{paddingBottom: 10}}
                value={this.state.courrielCo}
                onChangeText={(courrielCo) => this.setState({ courrielCo })}
                />
              <Input
                placeholder='Mot de passe'
                containerStyle={{paddingBottom: 10}}
                value={this.state.passwordCo}
                secureTextEntry={true}
                onChangeText={(passwordCo) => this.setState({ passwordCo })}
                />
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D'}}
                titleStyle={{color: "#FFF"}}
                title="CONNEXION"
                onPress={()=>{this.setConnexion(this.state.courrielCo, this.state.passwordCo)}}
                />
            </View>
            <View style={{flex: 0.6, justifyContent:'center', alignItems:'center', borderColor: '#428B9D', borderWidth: 2, marginTop: 20}}>
              <Input
                placeholder='Username'
                containerStyle={{paddingBottom: 10}}
                value={this.state.usernameCr}
                onChangeText={(usernameCr) => this.setState({ usernameCr })}
                />
              <Input
                placeholder='Mot de passe'
                secureTextEntry={true}
                containerStyle={{paddingBottom: 10}}
                value={this.state.passwordCr}
                onChangeText={(passwordCr) => this.setState({ passwordCr })}
                />
              <Input
                placeholder='Email'
                containerStyle={{paddingBottom: 10}}
                value={this.state.courrielCr}
                onChangeText={(courrielCr) => this.setState({ courrielCr })}
                />
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D'}}
                titleStyle={{color: "#FFF"}}
                title="CREER"
                onPress={()=>{this.setCreationAccount()}}
                />
            </View>
            </View>
        );
      } else {
        return (
          <View style={{flex: 1}}>
            <View style={{flex: 0.3, alignItems:'center', justifyContent:'center'}}>
              <Avatar
              size="xlarge"
              rounded
              title={this.getFirstCharUsername()}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              />
            </View>

            <View style={{flex: 0.6, alignItems:'center'}}>
              <Text style={{fontSize: 16}}>Bonjour {Store.UserUsername}</Text>
              <Text style={{fontSize: 16}}>{Store.UserEmail}</Text>
            </View>

            <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D', marginBottom: 10}}
                title="MES VOYAGES"
                onPress={()=>this.props.navigation.navigate("UserTrips")}
                />
            </View>

          </View>
        );
      }
  }

  async _removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

   setDisconnection() {
     Store.setIsLog(0)
     this._removeItemValue("localEmail")
     this._removeItemValue("localToken")
     this._removeItemValue("localUsername")
     Store.setUserEmail("")
     Store.setUserToken("")
     Store.setUserUsername("")
     ToastAndroid.show("Déconnexion", ToastAndroid.SHORT)
     this.props.navigation.navigate('MainMenu')
    };

    _storeToken = async (param) => {
      try {
        await AsyncStorage.setItem('localToken', param);
      } catch (error) {
        // Error saving data
      }
    }

    _storeEmail = async (param) => {
      try {
        await AsyncStorage.setItem('localEmail', param);
      } catch (error) {
        // Error saving data
      }
    }

    _storeUsername = async (param) => {
      try {
        await AsyncStorage.setItem('localUsername', param);
      } catch (error) {
        // Error saving data
      }
    }

   setConnexion(paramEmail, paramPwd) {
     fetch('http://193.70.90.162/auth/login', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         email: paramEmail,
         password: paramPwd,
       }),
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
          console.log(res, data);
          if (data == null) {
            Alert.alert("Echec lors de la connexion")
          } else {
            Store.setUserToken(data.token)
            Store.setUserEmail(data.user.email)
            Store.setUserUsername(data.user.username)
            Store.setIsLog(1)
            this._storeToken(data.token)
            this._storeEmail(data.user.email)
            this._storeUsername(data.user.username)
            this.props.navigation.navigate('MainMenu')
          }
        })
        .catch(error => {
          console.error(error);
          return { name: "network error", description: "" };
        });
   }

   setCreationAccount = () => {
     fetch('http://193.70.90.162/auth/signup', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username: this.state.usernameCr,
         password: this.state.passwordCr,
         email: this.state.courrielCr,
         description: this.state.descriptionCr
       }),
     }).then(function(response) {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data]);
          }).then(([statusCode, data]) => {
            console.log(statusCode)
            console.log(data)
            //Do Something here
            this.setConnexion(this.state.courrielCr, this.state.passwordCr)

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
          centerComponent={{ text: 'ESPACE PERSONNEL', style: { color: '#fff'} }}
          rightComponent={{ icon: 'exit-to-app', color: '#fff', onPress:()=>{this.setDisconnection()}}}
        />
      {this.contentOfBody()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor:'pink',
  }
});
