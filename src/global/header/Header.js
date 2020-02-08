import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

export default function Header() {
  return(
    <View style={styles.header}>
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold'
  }
})
