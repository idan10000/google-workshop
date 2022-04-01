import React from 'react';
import { Appbar } from 'react-native-paper';
import { globalStyles } from '../styles/global';
import {StyleSheet} from 'react-native';

export default function Header({ navigation, back }) {
  return (
    <Appbar.Header style={styles.header}>
      
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Find my Pet" style={styles.content} titleStyle={styles.title}/>
      {back ? null : <Appbar.Action style={styles.action} icon="bell" onPress={() => {navigation.navigate('התראות')}} />}

    </Appbar.Header>
  );
}


const styles = StyleSheet.create({
    header: {
      backgroundColor: "blue"
    },
    content: {
      marginLeft: 0, 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      zIndex: -1
    },
    title :{
      alignSelf: 'center'
    },
    action: {
      marginLeft: 0, 
      position: 'absolute', 
      left: 20, 
      right: 0
    }
  })