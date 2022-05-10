import { List } from 'react-native-paper';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList, ImageBackground
} from 'react-native';
import NewReportFAB from '../shared_components/newReportFAB';


export default function NotificationsScreen(){
    const [notifications, setNotifications] = useState([
        {id:1, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},
        {id:2, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},
        {id:3, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},
        {id:4, title: "האם זה הכלב שלך?", description: "כלב שדומה לרקסי נמצא באזורך"},
      ])

    const deleteHandler = (id) => {
        setNotifications((prevNotifications) => {
            return prevNotifications.filter(notification => notification.id != id)
        })
    }


    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../assets/new_background.png')}>
        <View style={styles.container}>
          <FlatList
            style={styles.notificationList}
            enableEmptySections={true}
            data={notifications}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (

                <TouchableOpacity onPress={() => {console.log("open notification")}}>
                    <List.Item
                        style={styles.listItem}
                        title={item.title}
                        description={item.description}
                        left={props => <List.Icon {...props} icon="bell" />}
                        right={props => (
                            <TouchableOpacity onPress={() => deleteHandler(item.id)}>
                                <List.Icon {...props} icon="close"/>
                            </TouchableOpacity>
                        )}
                    />
                </TouchableOpacity>
              )}}/>
          {/* <NewReportFAB/> */}
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
        backgroundColor:"#F9F8F0",
    }
});
