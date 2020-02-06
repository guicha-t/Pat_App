import React, { Component } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, TouchableOpacity, Linking,
  AsyncStorage, ImageBackground, Switch} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';

import CustomDrawerItems from './CustomDrawerItem'


const CustomDrawerContentComponent = (props) => (
  <View style={styles.drawerContainer}>
    <View style={{flex:0.8, justifyContent:'center', alignItems:'center'}}>
      style={{flex:0.6, height: '60%', width: '60%', justifyContent: 'center', alignItems: 'center'}}
      resizeMode="contain"/>
    </View>
    <View style={styles.ListItems}>
      <CustomDrawerItems navigation={props.navigation}/>
    </View>
  </View>
)

const DrawerMenu = createDrawerNavigator(
  {

  },
  {
    initialRouteName: 'Authentification',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,

  }
);

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: cfg.PRIMARY,
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  ListItems: {
    flex: 1,
  },
  drawerFooter: {
    flex:0.4,
    borderTopWidth: 1,
    borderTopColor: '#FEE599',
  },
  topFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});

export default DrawerMenu;
