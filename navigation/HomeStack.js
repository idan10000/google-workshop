import {createStackNavigator} from '@react-navigation/stack';
import Header from '../shared_components/Header';
import OldhomeScreen from "../screens/HomePage";
import ReportPage from "../screens/Report/ReportPage"
import AdPage from '../screens/Poster/PosterPage';
import NotificationsPage from '../screens/NotificationsPage';
import NavigationBar from './NavigationBar';
import ReportForBrowser from '../screens/Report/ReportBrowse';
import PosterBrowse from '../screens/Poster/PosterBrowse';
import Screen1Report from "../screens/Report/Screen1Report";
import Screen2Report from "../screens/Report/Screen2Report";
import Screen3Report from "../screens/Report/Screen3Report";
import Screen2Poster from "../screens/CreatePoster/Screen2Poster";
import Screen3Poster from "../screens/CreatePoster/Screen3Poster";
import {registerForPushNotificationsAsync} from '../shared_components/NotificationsUtils'
import * as Notifications from 'expo-notifications';
import {fireStoreDB} from "../shared_components/Firebase";
import {arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthenticatedUserContext} from "./AuthenticatedUserProvider";
import Screen1Poster from "../screens/CreatePoster/Screen1Poster";
import SignIn from "../screens/SignIn";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
// export const NotificationsListContext = createContext({});

const Stack = createStackNavigator();

export default function HomeStack() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [newNotification, setNewNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const {user} = useContext(AuthenticatedUserContext);

    useEffect(() => {
        registerForPushNotificationsAsync().then(async (token) => {
            setExpoPushToken(token)
            console.log("UID: " + user.uid)
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
        notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
            const userRef = doc(fireStoreDB, "Users", user.uid);
            setNewNotification(true);
            await updateDoc(userRef, {
                notifications: arrayUnion(notification)
            }).then(() => {
            }).catch(error => {
                console.log(error)
            })
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const reportID = response.notification.request.content.data.report;
            console.log(reportID);
            const reportRef = doc(fireStoreDB, "Reports", reportID);
            return getDoc(reportRef).then((reportSnap) => {
                if (reportSnap.exists()) {
                    //console.log("Document data:", userSnap.data());
                    const report = reportSnap.data();
                    //setResponseReport(report);
                    console.log(report)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such report!");
                }
            })
            // navigation.navigate(destination, {data: data})
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    const options = {header: (props) => <Header {...props} newNotification={newNotification}/>}

    return (
        <Stack.Navigator screenOptions={options} /*initialRouteName={responseReport === {} ? "התראות" : "Main"}*/>
            <Stack.Screen name="Main" component={NavigationBar} />
            <Stack.Screen name="Home" component={OldhomeScreen}/>
            <Stack.Screen name="ReportCreation" component={Screen1Report}/>
            <Stack.Screen name="ReportCreation2" component={Screen2Report}/>
            <Stack.Screen name="ReportCreation3" component={Screen3Report}/>
            <Stack.Screen name="SignIn" component={SignIn}/>

            <Stack.Screen name="PosterCreation" component={Screen1Poster}/>
            <Stack.Screen name="PosterCreation2" component={Screen2Poster}/>
            <Stack.Screen name="PosterCreation3" component={Screen3Poster}/>
            <Stack.Screen name="ReportPage" component={ReportPage}/>
            {/*<Stack.Screen name="CreateAd" component={PosterPostingComponent}/>*/}
            <Stack.Screen name="AdPage" component={AdPage}/>
            <Stack.Screen name="התראות">
                {(props) => <NotificationsPage {...props} setNewNotification={setNewNotification}/>}
            </Stack.Screen>
    {/* <Stack.Screen name="ReportForBrowse" component={ReportForBrowse}/> */}
            <Stack.Screen name="Report" component={ReportForBrowser} />
            <Stack.Screen name="Poster" component={PosterBrowse} />

        </Stack.Navigator>
    );
}

