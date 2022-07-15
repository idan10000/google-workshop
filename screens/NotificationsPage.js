import { List } from 'react-native-paper';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View, ScrollView,
    FlatList, Text, RefreshControl, ActivityIndicator
} from 'react-native';
import {arrayRemove, doc, getDoc, updateDoc} from "firebase/firestore";
import {fireStoreDB} from "../shared_components/Firebase";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";


export default function NotificationsPage({navigation, setNewNotification}) {

    const {user} = useContext(AuthenticatedUserContext);
    const loadedNotifications = useRef(false)
    const [notifications, setNotifications] = useState([])
    const [isNotification, setIsNotification] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(async () => {
        await loadNotifications();
        setIsLoading(false);
    })

    const loadNotifications = () => {
        const userRef = doc(fireStoreDB, "Users", user.uid);
        return getDoc(userRef).then((userSnap) => {
            setNewNotification(false);
            setRefreshing(false);
            if (userSnap.exists()) {
                //console.log("Document data:", userSnap.data());
                if (loadedNotifications.current === false){
                    loadedNotifications.current = true
                    const notificationsArray = userSnap.data().notifications;
                    if (notificationsArray === undefined || notificationsArray.length === 0){
                        setIsNotification(false);
                    }
                    else {
                        setIsNotification(true);
                    }
                    setNotifications(notificationsArray)
                }
                // setNotifications(userSnap.data().notifications);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }
    // refreshes the notifications so we can see the newest matches
    const refreshNotifications = () => {
        const userRef = doc(fireStoreDB, "Users", user.uid);
        return getDoc(userRef).then((userSnap) => {
            setRefreshing(false);
            setNewNotification(false);
            if (userSnap.exists()) {
                //console.log("Document data:", userSnap.data());
                const notificationsArray = userSnap.data().notifications;
                if (notificationsArray === undefined || notificationsArray.length === 0){
                    setIsNotification(false);
                }
                else {
                    setIsNotification(true);
                }
                setNotifications(notificationsArray);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }
    // dismissing a message
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

    // when you see a relevant notification, and you want to open it fot more details
    const goToReportPage = (item) => {
        console.log(item.request.content.title)
        console.log(item.request.content.body)
        console.log(item.request.content.data)
        const report = item.request.content.data.report;
        console.log("reportID")
        console.log(report)
        navigation.navigate("Report", {data: report})
    }

    if (isLoading)
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#DCA277" />
            </View>
        );

    if (isNotification === false){
        return (
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refreshNotifications} />
                        }
                        contentContainerStyle={styles.noNotificationsContainer}>

                        <Text style={styles.noNotificationsTitle}>אין התראות...</Text>
                        <Text style={styles.noNotificationsParagraph}>כשנמצא כלב שמתאים לתמונה של הכלב שלכם, נשלח לכם התראה מיד, והיא תופיע ממש כאן</Text>
                    </ScrollView>
                </View>
        )
    }

    return (

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
    );
}


const styles = StyleSheet.create({
    notificationList:{
      marginTop:0,
      padding:0,
    },
    container:{
      backgroundColor: "#F9F8F0",
      flex:1,
      justifyContent: "center",
    },
    listItem: {
        borderWidth:0.18,
        borderColor:"#000",
        backgroundColor:"#F9F8F0",
    },
    noNotificationsTitle:{
        color:"#777777",
        textAlign:"center",
        fontSize:32,
        marginBottom:40
    },
    noNotificationsParagraph:{
        color:"#777777",
        textAlign:"center",
        fontSize:18,
        marginBottom:20,
        marginHorizontal:10
    },
    noNotificationsContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
});
