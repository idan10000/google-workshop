import { List } from 'react-native-paper';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';


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
        </View>
      );

}


const styles = StyleSheet.create({
    notificationList:{
      marginTop:20,
      padding:10,
    },
    container:{
      backgroundColor:'white',
      flex:1
    }
  });
  