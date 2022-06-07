import "react-native-gesture-handler";
import React from "react";

import {I18nManager} from "react-native";
import Routes from "./navigation";
import { LogBox } from 'react-native';


export default function App() {

    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreLogs(['Setting a timer']);
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);


    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
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
