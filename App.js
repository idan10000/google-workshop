import 'react-native-gesture-handler';
import React from 'react';
import  NotificationsStack from './navigation/notificationsStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <PaperProvider>
        <NotificationsStack/>
    </PaperProvider>
  );
}


