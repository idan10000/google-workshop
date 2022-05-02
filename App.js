import "react-native-gesture-handler";
import React from "react";

import {I18nManager} from "react-native";
import Routes from "./navigation";


export default function App() {

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
