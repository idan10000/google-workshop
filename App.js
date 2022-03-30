import 'react-native-gesture-handler';
import React from 'react';
import  NotificationsStack from './navigation/notificationsStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import PosterPostingComponent from "./screens/post_poster_screen";
import PostListItem from "./shared_components/postListItem";


export default function App() {
  return (
    <PaperProvider>
        <PostListItem
            image={"https://lh3.googleusercontent.com/nLJTwsMCCB1WKJvPxPJFyGr85jOei4F1ouoEyivRNiELZmnETxIRtGzY2vdX4Pgemf3-EErQr2_CQI2x=w544-h544-l90-rj"}
            date={"10/10/10"}
            distance={"10"}
            pressHandler={()=>{}}
        />
    </PaperProvider>
  );
}


