import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image} from 'react-native';
import { observer } from 'mobx-react';
import {Header} from 'react-native-elements'

import Store from './../../global/store/Store'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

@observer
export default class CountryProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#428B9D',
          }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:()=>this.props.navigation.navigate("CountriesList") }}
          centerComponent={{ text: 'FICHE PAYS', style: { color: '#fff'} }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
        />
        <View style={{height: 80, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{Store.DataCountry.nomPays}</Text>
        </View>
        <ScrollView style={{}}>
          <View style={{height: 200, backgroundColor:'#428B9D', justifyContent:'center', alignItems:'center', paddingLeft: 10, paddingRight: 10}}>
            <Text style={{textAlign:'justify', fontSize: 14, color: 'white'}}> {Store.DataCountry.description}</Text>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/government.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>Capitale</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.infPays.capitale}</Text></View>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/langue.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>Langue</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.infPays.langue}</Text></View>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/time-zone.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>Décalage Horaire</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.infPays.decHorraire}</Text></View>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/gps.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>GPS lat/long</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.lat}</Text><Text>{Store.DataCountry.lng}</Text></View>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/superficie.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>Superficie</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.infPays.superficie}</Text></View>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/user.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>Population</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.infPays.population}</Text></View>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/saison.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>Saison</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.infPays.saison}</Text></View>
          </View>

          <View style={{height: 60, borderBottomWidth: 1, borderColor:'#428B9D', flexDirection: 'row'}}>
            <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./../../assets/countryProfil/climat.png')} style={{width:40, height:40}}/>
            </View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text style={{fontWeight: 'bold'}}>Climat</Text></View>
            <View style={{flex: 0.4, justifyContent:'center'}}><Text>{Store.DataCountry.infPays.climat}</Text></View>
          </View>
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
