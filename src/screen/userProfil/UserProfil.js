import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Alert, AlertIOS, ToastAndroid, Platform} from 'react-native';
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

      emailCo: 'romain.gadrat@epitech.eu',
      passwordCo: 'fodid',

      usernameCr: '',
      passwordCr: '',
      courrielCr: '',
      descriptionCr: '',
    };
  }

  contentOfBody(){
      if (!Store.IsLog) {
        return (
          <View style={{flex: 1, backgroundColor: '#FFF', padding: 20}}>
            <View style={{flex: 0.4, justifyContent:'center', alignItems:'center', borderColor: '#428B9D', borderWidth: 2}}>
              <Input
                placeholder='Descri'
                containerStyle={{paddingBottom: 10}}
                value={this.state.emailCo}
                onChangeText={(emailCo) => this.setState({ emailCo })}
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
                onPress={()=>{this.setConnexion(this.state.emailCo, this.state.passwordCo)}}
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
              <Input
                placeholder='Description'
                containerStyle={{paddingBottom: 10}}
                value={this.state.descriptionCr}
                onChangeText={(descriptionCr) => this.setState({ descriptionCr })}
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
              title="RG"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              />
            </View>

            <View style={{flex: 0.6, alignItems:'center'}}>
              <Text style={{fontSize: 16}}>Bonjour {Store.UserUsername}</Text>
              <Text style={{fontSize: 16}}>{Store.UserEmail}</Text>
              <Text style={{fontSize: 16, fontStyle: "italic"}}>Desc: "{Store.UserDescription}"</Text>
            </View>

            <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D', marginBottom: 10}}
                title="DECONNEXION"
                onPress={()=>{this.setDisconnection()}}
                />
            </View>

          </View>
        );
      }
  }

   setDisconnection = () => {
     Store.setIsLog(0)
     Store.setUserEmail("")
     Store.setUserToken("")
     Store.setUserUsername("")
     Store.setUserDescription("")
//     ToastAndroid.show("Déconnexion", ToastAndroid.SHORT)
    };

   setConnexion = (paramEmail, paramPwd) => {
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
    //        Alert.alert("Echec lors de la connexion")
          } else {
            Store.setUserToken(data.token)
            Store.setUserEmail(data.user.email)
            Store.setUserUsername(data.user.username)
            Store.setUserDescription(data.user.description)
            Store.setIsLog(1)
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
            Alert.alert("Echec lors de la création du compte")
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
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("MainMenu") }}
          centerComponent={{ text: 'ESPACE PERSONNEL', style: { color: '#fff'} }}
          rightComponent={{ icon: 'exit-to-app', color: '#fff', onPress:()=>this.props.navigation.navigate('MainMenu') }}
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
