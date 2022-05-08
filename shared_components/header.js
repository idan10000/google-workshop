import React from 'react';
import { Appbar } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function Header({ navigation, back }) {
  return (
    <Appbar.Header style={styles.header}>

      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="FinDog" style={styles.content} titleStyle={styles.title}/>
      {back ? null : <Appbar.Action style={styles.action} icon="bell" color='#1B1209' onPress={() => {navigation.navigate('התראות')}} />}

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
      color: "#1B1209"
    },
    action: {
      marginLeft: 0,
      position: 'absolute',
      left: 20,
      right: 0,
    }
  })
