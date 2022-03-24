import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { IconButton } from 'react-native-paper';

export default function Header({ navigation }) {

  return (
      <View style={styles.header}>
        <IconButton
          icon='bell'
          style={styles.button} 
          onPress={() => {navigation.navigate('Notifications')}}/>
        <Text style={styles.headerText}> Find my Dog </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    margin: 15,
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  button: {
    position: 'absolute',
    left: 5,
    top: 24
  },
})