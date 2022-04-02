import "react-native-gesture-handler";
import React from "react";

import { Provider as PaperProvider } from "react-native-paper";
// import SignUp from "./screens/SignUp";
import { I18nManager } from "react-native";
// import PageLaunch from "./screens/PageLaunch";
// import Create_poster_screen from "./screens/posterCreate/create_poster_screen";
// import HomeScreen from "./screens/homeScreen";
import HomeStack from "./navigation/homeStack";
// import { NavigationContainer } from "@react-navigation/native";
import AdPage from "./screens/Ad_dog/ad_page";
import AdForBrowse from "./screens/Ad_dog/ad_for_browse";
// import ReportForBrowse from "./screens/Report_dog/report_for_browse";
// import ReportPage from "./screens/Report_dog/report_page";
// import EditProfileScreen from "./screens/Profile_user/Edit_profile";
// import ProfileScreen from "./screens/Profile_user/User_profile";
// import SupportScreen from "./screens/Profile_user/Technical_support";

export default function App() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  return (
    <PaperProvider>
      <AdForBrowse />
      {/* <NavigationContainer>
                <HomeStack/>
            </NavigationContainer> */}
    </PaperProvider>
  );
}
