import 'react-native-gesture-handler';
import React from 'react';
import  NotificationsStack from './navigation/notificationsStack';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <NotificationsStack/>
    </NavigationContainer>
  );
}


