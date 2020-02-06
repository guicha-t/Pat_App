import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';

import Store from './../store/Store'

export default class CustomDrawerItems extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{height: 40, borderBottomWidth: 1, borderColor: 'white', justifyContent:'flex-end', alignItems: 'flex-end',paddingRight: 20, opacity:0.5}}>
            <Text style={{color: 'white', fontSize:16, fontWeight:'bold',}}>
              ACCUEIL
            </Text>
          </View>

          <View style={{height: 40}}>
          </View>

        </ScrollView>
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
      height: 42,
    },
    icon: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelContainer: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 20,
      paddingTop: 5,
    },
    label: {
      color:'white',
      fontSize: 16,
      fontWeight:'bold',
    },

});
