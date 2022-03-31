import 'react-native-gesture-handler';
import React from 'react';
import  NotificationsStack from './navigation/notificationsStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import PosterPostingComponent from "./screens/post_poster_screen";
import PostListItem from "./shared_components/postListItem";
import BrowsePage from "./screens/browse_page";
import {I18nManager} from "react-native";
import HomeScreen from "./screens/homeScreen";


export default function App() {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);

  return (
    <PaperProvider>
        <HomeScreen/>
    </PaperProvider>
  );
}


