import React, {useContext} from 'react';
import {Appbar, Divider, Provider, Menu, Text} from 'react-native-paper';
import {Alert, StyleSheet} from 'react-native';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {clearAllNotifications, clearAllNotificationsFirebase} from "./NotificationsUtils";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";
import {NotificationsContext} from "../navigation/NotificationsProvider";
import {doc, updateDoc} from "firebase/firestore";
import {fireStoreDB} from "./Firebase";


// this is the page of the header of the app which appears almost in every screen

export default function Header({ navigation, back, newNotification, refreshNotifications}) {
    const { user } = useContext(AuthenticatedUserContext);

    //const _handleMore = () => console.log('Shown more');
    const route = useRoute();

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const clearAllNotifications = (user) => {
        Alert.alert(
            "למחוק את כל ההתראות?",
            "לא יהיה ניתן לשחזר אותן לאחר מכן!",
            [
                {text: "ביטול",
                    onPress:() => {}},
                {text: "אישור",
                    onPress: async () => {await clearAllNotificationsFirebase(user)
                                            await refreshNotifications()}}
            ],
            {
                cancelable: true,
                onDismiss: () => {}
            }
        );
    }

    const clearAllNotificationsFirebase = async (user) => {
        const userRef = doc(fireStoreDB, "Users", user.uid);
        await updateDoc(userRef, {
            notifications: []
        }).catch(error => {
            console.log(error)
        })
    }

    const clearAndRefresh = async () => {
        //console.log(refreshNotifications)
        await clearAllNotifications(user)
        closeMenu()
    }

    return (
        <NotificationsContext.Consumer>
            {(value) => {
                return (
                    <Appbar.Header style={styles.header}>

                        {back && <Appbar.BackAction onPress={navigation.goBack} color='#5C4C3D' style={styles.bellAction}/>}

                        <View
                            style={[
                                StyleSheet.absoluteFill,
                                {alignItems: "center", justifyContent: "center"},
                            ]}
                            pointerEvents="box-none"
                        >
                            <Appbar.Content
                                title={route.name === "התראות" ? <Text style={styles.title}>התראות</Text> :
                                    <Text style={styles.title}>Findog</Text>}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bottom:20
                                }}
                            />
                        </View>
                        <View style={{flex: 1}}/>

                        {route.name === "התראות" &&
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={
                                    <Appbar.Action style={styles.deleteAction} icon="dots-vertical" onPress={openMenu}
                                                   color='#5C4C3D'/>
                                }>
                                <Menu.Item onPress={clearAndRefresh} title="מחיקת כל ההתראות"/>

                            </Menu>}

                        {!back && <Appbar.Action style={styles.bellAction}
                                                 icon={newNotification ? "bell-alert-outline" : "bell-outline"}
                                                 color='#5C4C3D' onPress={() => {
                            navigation.navigate('התראות')
                        }}/>}

                    </Appbar.Header>
                )
            }}
            </NotificationsContext.Consumer>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#F4F2E3",
        height: 30,
    },
    title :{
      alignSelf: 'center',
      color: "#5C4C3D",
      fontWeight: 'bold'
    },
    bellAction: {
      marginLeft: 0,
      position: 'absolute',
      left: 20,
      right: 0,
        bottom:10
    },
    deleteAction: {
        right: 0,
        bottom: 15
    },
  })
