import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Alert, AlertIOS, ToastAndroid, Platform, AsyncStorage, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Button, Input, Avatar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import Dialog from "react-native-dialog";

import Store from './../../global/store/Store'



@observer
export default class UserProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courrielCo: 'guichard.t@hotmail.fr',
      passwordCo: 'Bonjour',
      usernameCr: '',
      passwordCr: '',
      courrielCr: '',

      pwdHide: true,
      pwd2Hide: true,
      pwdHideIcon: 'eye',
      pwd2HideIcon: 'eye',

      dialogVisible: false,
      newIdentifiant: Store.UserUsername,

      dialogPwdVisible: false,
      email: '',

      trips: [],
    };
  }

  getFirstCharUsername() {
    return (Store.UserUsername.charAt(0).toUpperCase());
  }


  triggerEmailCode(param) {
    console.log("PARAM ===== " + param)
    fetch('http://193.70.90.162/auth/forgetPassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: param,
      }),
    }).then(function(response) {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data]);
      }).then(([statusCode, data]) => {
        if (statusCode != 200) {
          Alert.alert(data.message)
        } else {
          if (this.state.dialogPwdVisible) {
            this.setState({'dialogPwdVisible':false});
          }
          this.props.navigation.navigate('ChangePwd', {
            email: param,
          });
        }
        this.setState({'loading':false})
        console.log(statusCode)
        console.log(data)
      }).catch(error => {
         console.error(error);
     });
  }

  confirmChangePassword(){
      Alert.alert(
       "CONFIRMATION ?",
       "En validant, un code va vous être transmis par email.",
       [
         {
           text: "Annuler",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel"
         },
         { text: "Confirmer", onPress: () => this.triggerEmailCode(Store.UserEmail) }
       ],
       { cancelable: true }
     );
  }

  ChangeUsername() {
    if (this.state.newIdentifiant.length > 0) {
      fetch('http://193.70.90.162/users/completeProfil', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + Store.UserToken,
        },
        body: JSON.stringify({
          username: this.state.newIdentifiant,
          store: "",
        }),
      }).then(function(response) {
          const statusCode = response.status
          const data = response.json()
          return Promise.all([statusCode, data]);
        }).then(([statusCode, data]) => {
          if (statusCode != 200) {
            Alert.alert(data.message)
          } else {
            Store.setUserUsername(this.state.newIdentifiant)
            this._storeUsername(this.state.newIdentifiant)
            this.handleDialog()
          }
          this.setState({'loading':false})
          console.log(statusCode)
          console.log(data)
        }).catch(error => {
           console.error(error);
       });
    } else {
      Alert.alert("Identifiant incorrect: Aucune valeur.")
    }
  }

  toggleHidePwd(){
    if (this.state.pwdHide) {
      this.setState({'pwdHide':false})
      this.setState({'pwdHideIcon':'eye-slash'})
    } else {
      this.setState({'pwdHide':true})
      this.setState({'pwdHideIcon':'eye'})
    }
  }

  toggleHidePwd2(){
    if (this.state.pwd2Hide) {
      this.setState({'pwd2Hide':false})
      this.setState({'pwd2HideIcon':'eye-slash'})
    } else {
      this.setState({'pwd2Hide':true})
      this.setState({'pwd2HideIcon':'eye'})
    }
  }

  ToggleModalEmail = () => {
    if (this.state.dialogPwdVisible) {
      this.setState({'dialogPwdVisible':false});
    } else {
      this.setState({'dialogPwdVisible':true});
    }
  }

  handleDialog = () => {
    if (this.state.dialogVisible) {
      this.setState({'dialogVisible':false});
    } else {
      this.setState({'dialogVisible':true});
    }
  };

  alertDownloadData() {
    Alert.alert(
      "TELECHARGEMENT DES DONNEES",
      "Etes-vous sûr de vouloir télécharger les dernières données? Vous pourrez les consulter en mode hors-ligne.",
      [
        {
          text: "NON",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OUI", onPress: () => this.downloadData() }
      ],
      { cancelable: false }
    );
  }

  downloadData(){
    fetch('http://193.70.90.162/offline/getAll', {
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
        }
        console.log(statusCode)
        console.log(data)
        this._storeData(data)

      }).catch(error => {
         console.error(error);
     });
  }

  _storeData = async (param) => {
    await AsyncStorage.setItem('LocalData', JSON.stringify(param) )
     .then(()=>{
     console.log('It was saved successfully')
     })
     .catch(()=>{
     console.log('There was an error saving the product')
     })
  }

  alertDeleteData() {
    Alert.alert(
      "SUPRESSION DES DONNEES",
      "Voulez-vous supprimer les données enregistrées sur votre téléphone ? Vous ne pourrez plus les consulter en mode hors-ligne.",
      [
        {
          text: "NON",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OUI", onPress: () => this.deleteData() }
      ],
      { cancelable: false }
    );
  }

    deleteData = async () => {
        try {
          await AsyncStorage.removeItem('LocalData');
          console.log("Success")
        } catch (error) {
          console.log(error.message);
        }
    }


  GoToWishlist() {
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
          this.props.navigation.navigate("Wishlist")
        }
        console.log(statusCode)
        console.log(data)
      }).catch(error => {
         console.error(error);
     });
  }

  contentOfBody(){
      if (!Store.IsLog) {
        return (
          <View style={{flex: 1, backgroundColor: '#FFF', padding: 20}}>
            <View style={{flex: 0.4, borderColor: '#428B9D', borderWidth: 2}}>
              <View style={{flex: 0.6}}>
                <View style={{flex: 0.5, alignItems:'center', justifyContent:'center'}}>
                  <Input
                    placeholder='Email'
                    value={this.state.courrielCo}
                    onChangeText={(courrielCo) => this.setState({ courrielCo })}
                    />

                </View>
                <View style={{flex: 0.5, flexDirection:'row', alignItems:'center'}}>
                  <View style={{flex: 0.8, alignItems:'center', justifyContent:'center'}}>
                    <Input
                      placeholder='Mot de passe'
                      containerStyle={{paddingBottom: 10}}
                      value={this.state.passwordCo}
                      secureTextEntry={this.state.pwdHide}
                      onChangeText={(passwordCo) => this.setState({ passwordCo })}
                      />

                  </View>
                  <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
                    <Icon
                      raised
                      size={20}
                      name={this.state.pwdHideIcon}
                      type='font-awesome'
                      onPress={() => this.toggleHidePwd()} />
                  </View>

                </View>

              </View>
              <View style={{flex: 0.4, justifyContent:'space-between', alignItems:'center'}}>
                <Button
                  buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D'}}
                  titleStyle={{color: "#FFF"}}
                  title="CONNEXION"
                  onPress={()=>{this.setConnexion(this.state.courrielCo, this.state.passwordCo)}}
                  />
                <TouchableOpacity style={{flex: 1, justifyContent:'flex-end'}} onPress={() => this.ToggleModalEmail()}>
                  <Text style={{color: '#C0C0C0'}}>Mot de passe oublié</Text>
                </TouchableOpacity>
                <Dialog.Container visible={this.state.dialogPwdVisible}>
                  <Dialog.Title>RECUPERATION DU MOT DE PASSE</Dialog.Title>
                  <Dialog.Description>
                    Renseignez votre E-mail.
                  </Dialog.Description>
                  <Dialog.Description>
                    Nous allons vous envoyer un code confidentiel. Rentrez le lors de la prochaine étape pour changer votre mot de passe.
                  </Dialog.Description>
                  <Dialog.Input
                    placeholder='E-mail'
                    wrapperStyle={{borderWidth: 1, borderColor: 'black', paddingLeft: 10, paddingRight: 10}}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    />
                  <Dialog.Button label="Annuler" onPress={() => this.ToggleModalEmail()} />
                  <Dialog.Button label="Valider" onPress={() => this.triggerEmailCode(this.state.email)} />
                </Dialog.Container>
              </View>
            </View>

            <View style={{flex: 0.6, borderColor: '#428B9D', borderWidth: 2, marginTop: 20}}>
              <View style={{flex: 0.25, alignItems:'center', justifyContent:'center'}}>
                <Input
                  placeholder='Username'
                  containerStyle={{}}
                  value={this.state.usernameCr}
                  onChangeText={(usernameCr) => this.setState({ usernameCr })}
                  />
              </View>

              <View style={{flex: 0.25, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <View style={{flex: 0.8, alignItems:'center', justifyContent:'center'}}>
                  <Input
                    placeholder='Mot de passe'
                    secureTextEntry={this.state.pwd2Hide}
                    containerStyle={{}}
                    value={this.state.passwordCr}
                    onChangeText={(passwordCr) => this.setState({ passwordCr })}
                    />
                </View>
                <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
                  <Icon
                    raised
                    size={20}
                    name={this.state.pwd2HideIcon}
                    type='font-awesome'
                    onPress={() => this.toggleHidePwd2()} />
                </View>

              </View>

              <View style={{flex: 0.25, alignItems:'center', justifyContent:'center'}}>
                <Input
                  placeholder='Email'
                  containerStyle={{}}
                  value={this.state.courrielCr}
                  onChangeText={(courrielCr) => this.setState({ courrielCr })}
                  />
              </View>

              <View style={{flex: 0.25, alignItems:'center', justifyContent:'center'}}>
                <Button
                  buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D'}}
                  titleStyle={{color: "#FFF"}}
                  title="CREER"
                  onPress={()=>{this.setCreationAccount()}}
                  />
              </View>
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

            <View style={{flex: 0.2, alignItems:'center'}}>
              <Text style={{fontSize: 16}}>Bonjour {Store.UserUsername}</Text>
              <Text style={{fontSize: 16}}>{Store.UserEmail}</Text>
            </View>

            <View style={{flex: 0.05, backgroundColor:'#E9E9E9', alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize: 16}}>Consultation des données hors-ligne</Text>
            </View>
            <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center', justifyContent:'center', backgroundColor:'#E9E9E9', marginBottom: 20}}>
              <Button
                buttonStyle={{height: 60, backgroundColor: '#30D925', marginBottom: 10}}
                title="TELECHARGER"
                onPress={()=>this.alertDownloadData()}
                />
              <Button
                buttonStyle={{height: 60, backgroundColor: '#428B9D', marginBottom: 10}}
                title="CONSULTER"
                onPress={()=>this.props.navigation.navigate("LocalCountryProfil")}
                />
              <Button
                buttonStyle={{height: 60, backgroundColor: '#D93025', marginBottom: 10}}
                title="SUPPRIMER"
                onPress={()=>this.alertDeleteData()}
                />
            </View>
            <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D', marginBottom: 10}}
                title="MODIFIER IDENTIFIANT"
                onPress={()=>this.handleDialog()}
                />
            </View>

            <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D', marginBottom: 10}}
                title="MODIFIER MOT DE PASSE"
                onPress={()=>this.confirmChangePassword()}
                />
            </View>

            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>MODIFICATION DE L'IDENTIFIANT</Dialog.Title>
              <Dialog.Description>
                Indiquer votre nouvel identifiant
              </Dialog.Description>
              <Dialog.Input
                placeholder='Nouvel Identifiant'
                wrapperStyle={{borderWidth: 1, borderColor: 'black', paddingLeft: 10, paddingRight: 10}}
                value={this.state.newIdentifiant}
                onChangeText={(newIdentifiant) => this.setState({ newIdentifiant })}
                />
              <Dialog.Button label="Annuler" onPress={() => this.handleDialog()} />
              <Dialog.Button label="Valider" onPress={() => this.ChangeUsername()} />
            </Dialog.Container>



            <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D', marginBottom: 10}}
                title="MES VOYAGES"
                onPress={()=>this.props.navigation.navigate("UserTrips")}
                />
            </View>

            <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
              <Button
                buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D', marginBottom: 10}}
                title="MA LISTE DE SOUHAITS"
                onPress={()=>this.GoToWishlist()}
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

  alertDisconnection() {
    Alert.alert(
      "DECONNEXION",
      "Etes-vous sûr de vouloir vous déconnecter?",
      [
        {
          text: "NON",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OUI", onPress: () => this.setDisconnection() }
      ],
      { cancelable: false }
    );
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
          rightComponent={{ icon: 'exit-to-app', color: '#fff', onPress:()=>{this.alertDisconnection()}}}
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
