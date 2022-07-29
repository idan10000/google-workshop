import React from 'react';
import { Appbar } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';

// this is the page of the header of the app which appears almost in every screen


export default function Header({ navigation, back, newNotification }) {

    const _handleMore = () => console.log('Shown more');
    const route = useRoute();

    return (
        <Appbar.Header style={styles.header} mode='center-aligned'>

            {back ? <Appbar.BackAction onPress={navigation.goBack} color ='#5C4C3D'/> : null }

            <Appbar.Content title={route.name === "התראות" ? "התראות":"Findog"} style={styles.content} titleStyle={styles.title}/>
            {route.name === "התראות" ? <Appbar.Action style={styles.action} icon="dots-vertical" onPress={_handleMore} color ='#5C4C3D'/> : null }

            {back ? null : <Appbar.Action style={styles.backAction} icon={newNotification ? "bell-alert":"bell"} color='#5C4C3D' onPress={() => {navigation.navigate('התראות')}} />}

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
    backAction: {
      marginLeft: 0,
      position: 'absolute',
      left: 20,
      right: 0,
    },
    action: {
        marginLeft: 0,
        position: 'absolute',
        left: 340,
        right: 0,
    }
  })
