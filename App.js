import "react-native-gesture-handler";
import React from "react";

import {Provider as PaperProvider} from "react-native-paper";
import {I18nManager} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import LaunchStack from "./navigation/launchStack";
import {user} from "./screens/SignUp";
import HomeStack from "./navigation/homeStack";
import {getAuth} from "firebase/auth";
import Routes from "./navigation";


export default function App() {

    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    console.log(user)


    return (
        <Routes/>
    );

// return (
//
//     <PaperProvider>
//         // <NavigationContainer>
//         // {stack}
//         // </NavigationContainer>
//         // </PaperProvider>
// );

}
