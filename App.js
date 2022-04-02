import "react-native-gesture-handler";
import React from "react";
// import NotificationsStack from "./navigation/notificationsStack";
// import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
// import PosterPostingComponent from "./screens/post_poster_screen";
// import PostListItem from "./shared_components/postListItem";
// import BrowsePage from "./screens/browse_page";
import { I18nManager } from "react-native";
// import HomeScreen from "./screens/homeScreen";
// import ProfileScreen from "./screens/Profile_user/User_profile";
// import Navigator from "./screens/Screen_Nofar/utils/profileStack";
// import SupportScreen from "./screens/Screen_Nofar/Technical_support";
// import ReportForBrowser from "./screens/Report_dog/report_for_browser";
// import ReportPage from "./screens/Report_dog/report_page";
// import AdTemple from "./screens/Ad_dog/ad_temple";
import AdPage from "./screens/Ad_dog/Ad_page";
// import AdForBrowser from "./screens/Ad_dog/ad_for_browse";
// import SupportScreen from "./screens/Profile_user/Technical_support";
import EditProfileScreen from "./screens/Profile_user/Edit_profile";
// import NotificationsStack from "./navigation/notificationsStack";
// import BrowseTabs from "./navigation/browsePageNavigation";
// import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  return (
    <PaperProvider>
      <AdPage />
    </PaperProvider>
  );
}
