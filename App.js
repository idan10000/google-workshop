import "react-native-gesture-handler";
import React from "react";

import {Provider as PaperProvider} from "react-native-paper";
import {I18nManager} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import LaunchStack from "./navigation/launchStack";



export default function App() {

    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    return (
        <PaperProvider>
            <NavigationContainer>
                <LaunchStack/>
            </NavigationContainer>
        </PaperProvider>
    );
}
