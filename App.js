import 'react-native-gesture-handler';
import React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import SignUp from "./screens/SignUp";
import {I18nManager} from "react-native";
import PageLaunch from "./screens/PageLaunch";
import Create_poster_screen from "./screens/create_poster_screen";
import HomeScreen from "./screens/homeScreen";
import HomeStack from "./navigation/homeStack";
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    I18nManager.allowRTL(true)
    I18nManager.forceRTL(true)
    return (
        <PaperProvider>
            <NavigationContainer>
                <HomeStack/>
            </NavigationContainer>
        </PaperProvider>
    );
}
