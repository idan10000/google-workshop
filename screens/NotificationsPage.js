import {List} from 'react-native-paper';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {arrayRemove, doc, getDoc, updateDoc} from "firebase/firestore";
import {fireStoreDB} from "../shared_components/Firebase";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";
import {NotificationsContext} from "../navigation/NotificationsProvider";


export default function NotificationsPage({navigation, refreshNotifications,
                                              setNewNotification}) {

    const {user} = useContext(AuthenticatedUserContext);
    const loadedNotifications = useRef(false)
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing,  isNotification, setIsNotification, notifications, setNotifications] =
        useContext(NotificationsContext);
    //const NotificationsConsumer = useContext(NotificationsContext).Consumer
    //console.log(NotificationsConsumer)
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

    const confirmDeletion = async (item) => {
        Alert.alert(
            "למחוק התראה?",
            "לא יהיה ניתן לשחזר אותה לאחר מכן!",
            [
                {text: "ביטול",
                    onPress:() => {}},
                {text: "אישור",
                    onPress: async () => {await deleteNotification(item)}}
            ],
            {
                cancelable: true,
                onDismiss: () => {}
            }
        );
    }

    // dismissing a message
    const deleteNotification = async (item) => {
        const userRef = doc(fireStoreDB, "Users", user.uid);
        await updateDoc(userRef, {
            notifications: arrayRemove(item)
        }).then(() => {
        }).catch(error => {
            console.log(error)
        })
        await refreshNotifications();
    }

    // when you see a relevant notification, and you want to open it for more details
    const goToReportPage = (item) => {
        const report = item.data.report;
        navigation.navigate("Report", {data: report})
    }


    return (
        <NotificationsContext.Consumer>
            {(value) => {
                const [refreshing, setRefreshing,  isNotification, setIsNotification, notifications, setNotifications] = value
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
                                return item.data.report.id + "_" + item.data.posterID
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
                                            title={item.title}
                                            description={item.body}
                                            left={props => <List.Icon {...props} icon="bell"/>}
                                            right={props => (
                                                <TouchableOpacity onPress={() => confirmDeletion(item)}>
                                                    <List.Icon {...props} icon="close"/>
                                                </TouchableOpacity>
                                            )}
                                            onPress={() => goToReportPage(item)}
                                        />
                                    </TouchableOpacity>
                                )
                            }}/>
                    </View>
                )
            }}
        </NotificationsContext.Consumer>
    )
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
