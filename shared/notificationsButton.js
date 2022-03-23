import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default function NotificationsButton({ navigation }) {
    
    const onPress = () => {navigation.navigate('Notifications')}
    
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View>
                <Ionicons name="notifications" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      left: 16,
    },
  })