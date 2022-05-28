import {createStackNavigator} from '@react-navigation/stack';
import Header from '../shared_components/Header';
import OldhomeScreen from "../screens/HomePage";
import ReportCreationScreen from "../screens/CreateReport/CreateReportPage";
import ReportPage from "../screens/Report/ReportPage"
import PosterPostingComponent from '../screens/CreatePoster/CreatePosterPage';
import AdPage from '../screens/Poster/PosterPage';
import NotificationsPage from '../screens/NotificationsPage';
import NavigationBar from './NavigationBar';
import ReportForBrowser from '../screens/Report/ReportBrowse';
import PosterBrowse from '../screens/Poster/PosterBrowse';
import Screen1Report from "../screens/Report/Screen1Report";
import Screen2Report from "../screens/Report/Screen2Report";
import Screen3Report from "../screens/Report/Screen3Report";
import {registerForPushNotificationsAsync} from '../shared_components/NotificationsUtils'
import * as Notifications from 'expo-notifications';
import {fireStoreDB} from "../shared_components/Firebase";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthenticatedUserContext} from "./AuthenticatedUserProvider";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Stack = createStackNavigator();

export default function HomeStack() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const {user} = useContext(AuthenticatedUserContext);

    useEffect(() => {
        registerForPushNotificationsAsync().then(async (token) => {
            setExpoPushToken(token)
            // update user document in firestore with the notifications token
            const userRef = doc(fireStoreDB, "Users", user.uid);
            await updateDoc(userRef, {
                notificationsToken: token
            }).then(() => {
            }).catch(error => {
                console.log(error)
            })
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    const options = {header: (props) => <Header {...props}/>}

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="Main" component={NavigationBar} />
            <Stack.Screen name="Home" component={OldhomeScreen}/>
            <Stack.Screen name="ReportCreation" component={Screen1Report}/>
            <Stack.Screen name="ReportCreation2" component={Screen2Report}/>
            <Stack.Screen name="ReportCreation3" component={Screen3Report}/>


            <Stack.Screen name="ReportPage" component={ReportPage}/>
            <Stack.Screen name="CreateAd" component={PosterPostingComponent}/>
            <Stack.Screen name="AdPage" component={AdPage}/>
            <Stack.Screen name="התראות" component={NotificationsPage} />
            {/* <Stack.Screen name="ReportForBrowse" component={ReportForBrowse}/> */}
            <Stack.Screen name="Report" component={ReportForBrowser} />
            <Stack.Screen name="Poster" component={PosterBrowse} />

        </Stack.Navigator>
    );
}

