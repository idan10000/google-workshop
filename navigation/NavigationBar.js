import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import OldhomeScreen from "../screens/HomePage";
//import HomeStack from './homeStack';
import BrowsePageNavigation from "./BrowsePageNavigation";
import Map from "../screens/Map/Map";
import ProfilePage from "../screens/Profile/Profile";


//here we define the attributes of the navigation bar which appears almost always in the bottom of the app


const Tab = createMaterialBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator
      initialRouteName="בית"
      screenOptions={{ headerShown: false }}
      barStyle={styles.bar}
      activeColor={"white"}
      inactiveColor={"#5C4C3D"}
    >
      <Tab.Screen
        name="פרופיל"
        component={ProfilePage}
        options={{ tabBarIcon: getIcon("account") }}
      />
      <Tab.Screen
        name="בית"
        component={OldhomeScreen}
        options={{ tabBarIcon: getIcon("home") }}
      />
      <Tab.Screen
        name="חפש"
        component={BrowsePageNavigation}
        options={{ tabBarIcon: getIcon("magnify") }}
      />
      <Tab.Screen
        name="מפה"
        component={Map}
        options={{ tabBarIcon: getIcon("map-outline") }}
      />
    </Tab.Navigator>
  );
}

const getIcon = (iconName) => {
  return (tabBarInfo) => {
    return (
      <IconButton
        icon={iconName}
        color={tabBarInfo.focused ? "white" : "#5C4C3D"}
        size={30}
        style={styles.icon}
      />
    );
  };
};

const styles = StyleSheet.create({
  icon: {
    bottom: "70%",
  },
  bar: {
    // backgroundColor: '#9E846C'
    backgroundColor: "#DCA277",
  },
});
