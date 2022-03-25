import React from 'react';
import {Text, View} from 'react-native';
import { IconButton } from 'react-native-paper';
import { globalStyles } from '../styles/global';

export default function Header({ navigation }) {

  return (
      <View style={globalStyles.header}>
        <IconButton
          icon='bell'
          style={globalStyles.button} 
          onPress={() => {navigation.navigate('Notifications')}}/>
        <Text style={globalStyles.headerText}> Find my Dog </Text>
      </View>
  );
}

