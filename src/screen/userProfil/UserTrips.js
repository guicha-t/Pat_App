import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image, FlatList} from 'react-native';
import { observer } from 'mobx-react';
import {Header, Input, Button, SearchBar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import Store from './../../global/store/Store'

const DEST = "Pay.nomPays"

@observer
export default class UserTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips:[],
    };
  }

  componentDidMount(){
    this.getUserTrip();
  }

  getUserTrip() {
    fetch('http://193.70.90.162/trips', {
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
        Store.setUserTrips(data)
        this.setState({trips:data})
        console.log(data)
        console.log(statusCode)
      }).catch(error => {
         console.error(error);
     });
  }

  deleteTripFromId(param) {
    fetch('http://193.70.90.162/trips/deleteTrip/' + param, {
      method: 'DELETE',
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
        console.log(data)
        console.log(statusCode)
        this.getUserTrip()
      }).catch(error => {
         console.error(error);
     });
  }

  getPaysName(idPays) {
    switch(idPays) {
      case 1:
        return("ROUMANIE");
      case 2:
        return("JAPON");
      case 3:
        return("AUSTRALIE");
      case 4:
        return("AFRIQUE DU SUD");
      case 5:
        return("FRANCE");
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("UserProfil") }}
          centerComponent={{ text: 'MES VOYAGES', style: { color: '#fff'} }}
          rightComponent={{ icon: 'refresh', color: '#fff', onPress:()=>this.getUserTrip()}}
        />
        <View style={{flex: 0.9}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.trips}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
            <View style={{flex: 1,height: 200, borderBottomWidth: 1, borderColor: '#DCDCDC', padding: 10}}>
              <View style={{height: 50, width: '100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Image style={{width: 50, height: 30, borderWidth: 1, borderColor: 'black'}} source={{uri: 'http://193.70.90.162/flags/'+item.idPays+'.png'}}/>
                <Text style={{fontSize: 22}}>{this.getPaysName(item.idPays)}</Text>
                <Button
                  title=""
                  type="outline"
                  icon={
                    <Icon
                      name="trash-o"
                      size={15}
                      color="#ABABAB"
                    />
                  }
                  buttonStyle={{width: 50, height: 32, borderColor:'#ABABAB'}}
                  onPress={()=>{this.deleteTripFromId(item.idTrip)}}
                />
              </View>
              <View style={{height: 50, width:'100%', flexDirection: 'row'}}>
                <View style={{flex: 0.5, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize: 16}}>Départ: {item.dateDepart}</Text>
                </View>
                <View style={{flex: 0.5, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize: 16}}>Retour: {item.dateRetour}</Text>
                </View>
              </View>
              <View style={{height: 100, alignItems:'center'}}>
                <Text style={{fontSize: 16}}>Type du voyage: {item.TypeVoyage}</Text>
                <Text style={{fontSize: 16}}>{item.nbPersonnes} participant(s)</Text>
              </View>
            </View>
          }
          keyExtractor={item => item.idTrip.toString()}
          />
        </View>
        <View style={{flex: 0.1}}>
          <Button
            buttonStyle={{height: '100%', backgroundColor: '#428B9D'}}
            title="CREATION DE VOYAGE"
            onPress={()=>{this.props.navigation.navigate('CreateTravel')}}
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
