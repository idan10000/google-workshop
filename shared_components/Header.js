import React from 'react';
import { Appbar } from 'react-native-paper';
import {StyleSheet} from 'react-native';

// this is the page of the header of the app which appears almost in every screen


export default function Header({ navigation, back, newNotification }) {


    return (
        <Appbar.Header style={styles.header}>

            {back ? <Appbar.BackAction onPress={navigation.goBack} color ='#5C4C3D'/> : null }

            <Appbar.Content title="FinDog" style={styles.content} titleStyle={styles.title}/>

            {back ? null : <Appbar.Action style={styles.action} icon={newNotification ? "bell-alert":"bell"} color='#5C4C3D' onPress={() => {navigation.navigate('התראות')}} />}

        </Appbar.Header>
    );
}


const styles = StyleSheet.create({
    header: {
      // backgroundColor: "#9E846C"
        backgroundColor: "#F4F2E3"
    },
    content: {
      marginLeft: 0,
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: -1,
    },
    title :{
      alignSelf: 'center',
      color: "#5C4C3D"
    },
    action: {
      marginLeft: 0,
      position: 'absolute',
      left: 20,
      right: 0,
    }
  })
