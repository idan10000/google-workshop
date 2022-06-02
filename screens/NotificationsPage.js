import { List } from 'react-native-paper';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList, ImageBackground, Text, RefreshControl
} from 'react-native';
import {arrayRemove, doc, getDoc, updateDoc} from "firebase/firestore";
import {fireStoreDB} from "../shared_components/Firebase";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";


export default function NotificationsPage({navigation}) {

    const {user} = useContext(AuthenticatedUserContext);
    const loadedNotifications = useRef(false)
    const [notifications, setNotifications] = useState([])
    const [refreshing, setRefreshing] = useState(true);
    // {id:1, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},
    // {id:2, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},
    // {id:3, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},
    // {id:4, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},

    useEffect(async () => {
        await loadNotifications();
    })

    const loadNotifications = () => {
        const userRef = doc(fireStoreDB, "Users", user.uid);
        return getDoc(userRef).then((userSnap) => {
            setRefreshing(false);
            if (userSnap.exists()) {
                //console.log("Document data:", userSnap.data());
                if (loadedNotifications.current === false){
                    loadedNotifications.current = true
                    setNotifications(userSnap.data().notifications)
                }
                // setNotifications(userSnap.data().notifications);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }

    const refreshNotifications = () => {
        const userRef = doc(fireStoreDB, "Users", user.uid);
        return getDoc(userRef).then((userSnap) => {
            setRefreshing(false);
            if (userSnap.exists()) {
                //console.log("Document data:", userSnap.data());
                setNotifications(userSnap.data().notifications);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }

    const deleteHandler = async (item) => {
        // setNotifications((prevNotifications) => {
        //     return prevNotifications.filter(notification => notification.id != id)
        // })
        const userRef = doc(fireStoreDB, "Users", user.uid);
        await updateDoc(userRef, {
            notifications: arrayRemove(item)
        }).then(() => {
        }).catch(error => {
            console.log(error)
        })
        await refreshNotifications();
    }

    const goToReportPage = (item) => {
        console.log(item.request.content.title)
        console.log(item.request.content.body)
        console.log(item.request.content.data)
        const reportID = item.request.content.data.report;
        const reportRef = doc(fireStoreDB, "Reports", reportID);
        return getDoc(reportRef).then((reportSnap) => {
            if (reportSnap.exists()) {
                //console.log("Document data:", userSnap.data());
                const report = reportSnap.data();
                navigation.navigate("Report", {data: report})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such report!");
            }
        })
    }

    // if (loadedNotifications.current === true && notifications.length === 0){
    //     return (
    //         <ImageBackground
    //             style={{flex: 1}}
    //             source={require('../assets/new_background.png')}>
    //             <View style={styles.container}>
    //                 <Text>אין התראות</Text>
    //             </View>
    //         </ImageBackground>
    //     )
    // }

    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../assets/new_background.png')}>
            <View style={styles.container}>
                <FlatList
                    style={styles.notificationList}
                    enableEmptySections={true}
                    data={notifications}
                    keyExtractor={(item) => {
                        return item.request.identifier;
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshNotifications} />
                    }
                    renderItem={({item}) => {
                        return (

                            <TouchableOpacity onPress={() => {
                                console.log("open notification")
                            }}>
                                <List.Item
                                    style={styles.listItem}
                                    title={item.request.content.title}
                                    description={item.request.content.body}
                                    left={props => <List.Icon {...props} icon="bell"/>}
                                    right={props => (
                                        <TouchableOpacity onPress={() => deleteHandler(item)}>
                                            <List.Icon {...props} icon="close"/>
                                        </TouchableOpacity>
                                    )}
                                    onPress={() => goToReportPage(item)}
                                />
                            </TouchableOpacity>
                        )
                    }}/>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    notificationList:{
      marginTop:0,
      padding:0,
    },
    container:{
      backgroundColor: "#F9F8F0",
      flex:1
    },
    listItem: {
        borderWidth:0.18,
        borderColor:"#000",
        backgroundColor:"#F9F8F0",
    }
});
