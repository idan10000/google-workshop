import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
import BrowsePage from '../screens/BrowsePage/BrowsePage';

// in our browse for dogs, we need to initialize tabs - one of "found" and one for "lost" and also its navigator


const Tab = createMaterialTopTabNavigator();

export default function BrowseTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {backgroundColor: "#5C4C3D"},
            tabBarStyle: {backgroundColor: "#F4F2E3"},
            tabBarLabelStyle: {color: "#5C4C3D", fontSize: 16, fontWeight: "bold"}
        }}>
            <Tab.Screen name="נמצאו" component={BrowsePage} initialParams={{collectionPath:"Reports", destination:"Report"}}/>

            <Tab.Screen name="אבדו" component={BrowsePage} initialParams={{collectionPath:"Posters", destination:"Poster"}}/>

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab: {
        color: "#F9F8F0"
    }
})
