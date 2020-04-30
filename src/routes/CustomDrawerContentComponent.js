import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';
import Store from './../global/store/Store'


export default class CustomDrawerItems extends Component {

  renderIfLog(){
    if (Store.IsLog === 1){
      return(
        <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateTravel')}>
          <View style={styles.button}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>ORGANISER SON VOYAGE</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DestinationFinder')}>
          <View style={styles.button}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>DENICHEUR DE DESTINATION</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ToolsMenu')}>
          <View style={styles.button}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>OUTILS</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfil')}>
          <View style={styles.button}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>PROFIL</Text>
            </View>
          </View>
        </TouchableOpacity>
        </View>
      );
    } else {
      return(
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfil')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>SE CONNECTER</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex:0.3, backgroundColor:'#428B9D'}}>
          <Image source={require('./../assets/logo_pat.png')}
            style={{flex:1, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
            resizeMode="contain"/>
        </View>

        <View style={{flex: 0.6, backgroundColor:'#FFF'}}>
          <ScrollView>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MainMenu')}>
              <View style={styles.button}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>ACCUEIL</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CountriesList')}>
              <View style={styles.button}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>LISTE PAYS</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CountriesPlanisphere')}>
              <View style={styles.button}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>PLANISPHERE</Text>
                </View>
              </View>
            </TouchableOpacity>

            {this.renderIfLog()}


          </ScrollView>
        </View>

        <View style={{flex: 0.1, backgroundColor:'#D93025'}}>
          <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center'}} onPress={() => this.props.navigation.navigate('EmergenciesMenu')}>
                <Text style={[styles.label, {color: 'white'}]}>URGENCES</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

CustomDrawerItems.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    button: {
      flexDirection: 'row',
      height: 56,
    },
    icon: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 20,
      paddingTop: 5,
      borderBottomWidth: 1,
      borderColor:'#E5E5E5',
    },
    label: {
      color:'black',
      fontSize: 16,
      fontWeight:'bold',
    },

});
