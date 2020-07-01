import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image, FlatList, TextInput} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Input, Button, SearchBar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import PasswordInputText from 'react-native-hide-show-password-input';

import Store from './../../global/store/Store'
import Loading from './../../global/loading/Loading';

@observer
export default class ChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.getParam('email', '0'),

      code: "",
      pwd: "",
      pwd2: "",

      pwdHide: true,
      pwd2Hide: true,
      pwdHideIcon: 'eye',
      pwd2HideIcon: 'eye',
      loading: false,
    };
  }

  componentDidMount(){
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

  triggerEmailCode(param) {
    console.log(param)
    fetch('http://193.70.90.162/auth/forgetPassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: this.state.email,
      }),
    }).then(function(response) {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data]);
      }).then(([statusCode, data]) => {
        if (statusCode != 200) {
          Alert.alert(data.message)
        } else {
          Alert.alert("E-mail renvoyé!")
        }
        this.setState({'loading':false})
        console.log(statusCode)
        console.log(data)
      }).catch(error => {
         console.error(error);
     });
  }

  confirmChangePwd() {
    fetch('http://193.70.90.162/auth/codePassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: this.state.pwd,
        verifPassword: this.state.pwd2,
        code: this.state.code
      }),
    }).then(function(response) {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data]);
      }).then(([statusCode, data]) => {
        if (statusCode != 200) {
          Alert.alert("Code incorrect ou nouveau mot de passe invalide.")
        } else {
          Alert.alert("Mot de passe changé!")
          this.setState({"code":""})
          this.setState({"pwd":""})
          this.setState({"pwd2":""})
          this.props.navigation.navigate("MainMenu")
        }
        console.log(statusCode)
        console.log("Data: "  + data)
      }).catch(error => {
         console.error(error);
     });
  }

  deleteTripFromId(param) {
  }

  render() {

    if (this.state.loading) {
        return (
          <Loading navigation={this.props.navigation}/>
        )
      }
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("UserProfil") }}
          centerComponent={{ text: 'CHANGEMENT DE MOT DE PASSE', style: { color: '#fff'} }}
        />
        <View style={{flex: 1, padding: 10}}>


          <View style={{flex: 0.1}}>
          </View>

          <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>

            <Input
              placeholder='Code envoyé par email'
              secureTextEntry={false}
              containerStyle={{paddingBottom: 10}}
              value={this.state.code}
              onChangeText={(code) => this.setState({ code })}
              />

          </View>

          <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
            <Button
              buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D'}}
              title="RENVOYER LE CODE"
              onPress={()=>this.triggerEmailCode(this.state.email)}
              />
          </View>

          <View style={{flex: 0.2, flexDirection:'row'}}>
            <View style={{flex: 0.8, alignItems:'center', justifyContent:'center'}}>
              <Input
                placeholder='Mot de passe'
                secureTextEntry={this.state.pwdHide}
                containerStyle={{paddingBottom: 10}}
                value={this.state.pwd}
                onChangeText={(pwd) => this.setState({ pwd })}
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

          <View style={{flex: 0.2, flexDirection:'row'}}>
            <View style={{flex: 0.8, alignItems:'center', justifyContent:'center'}}>
              <Input
                placeholder='Confirmation du mot de passe'
                secureTextEntry={this.state.pwd2Hide}
                containerStyle={{paddingBottom: 10}}
                value={this.state.pwd2}
                onChangeText={(pwd2) => this.setState({ pwd2 })}
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

          <View style={{flex: 0.1}}>
          </View>

          <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
            <Button
              buttonStyle={{height: 60, width: 300, backgroundColor: '#428B9D'}}
              title="CONFIRMER"
              onPress={()=>this.confirmChangePwd()}
              />
          </View>
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
