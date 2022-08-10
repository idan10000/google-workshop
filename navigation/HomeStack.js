//here we initialize the stuck of our app - we declare the relevant screens for the stuck

import { createStackNavigator } from "@react-navigation/stack";
import Header from "../shared_components/Header";
import OldhomeScreen from "../screens/HomePage";
import ReportPage from "../screens/Report/ReportPage";
import AdPage from "../screens/Poster/PosterPage";
import NotificationsPage from "../screens/NotificationsPage";
import NavigationBar from "./NavigationBar";
import ReportForBrowser from "../screens/Report/ReportBrowse";
import PosterBrowse from "../screens/Poster/PosterBrowse";
import Screen1Report from "../screens/Report/Screen1Report";
import Screen2Report from "../screens/Report/Screen2Report";
import Screen3Report from "../screens/Report/Screen3Report";
import Screen2Poster from "../screens/CreatePoster/Screen2Poster";
import Screen3Poster from "../screens/CreatePoster/Screen3Poster";
import { registerForPushNotificationsAsync } from "../shared_components/NotificationsUtils";
import * as Notifications from "expo-notifications";
import { fireStoreDB } from "../shared_components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import {
  NotificationsContext,
  NotificationsProvider,
} from "./NotificationsProvider";
import Screen1Poster from "../screens/CreatePoster/Screen1Poster";
import SupportPage from "../screens/Profile/TechnicalSupport";
import MyReports from "../screens/Profile/myReports";
import MyPosters from "../screens/Profile/myPosters";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
// export const NotificationsListContext = createContext({});

const Stack = createStackNavigator();

// setting the default home screen with no notifications
export default function HomeStack() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [newNotification, setNewNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { user } = useContext(AuthenticatedUserContext);
  const { val } = useContext(NotificationsContext);
  const [
    refreshingNotifications,
    setRefreshingNotifications,
    isNotification,
    setIsNotification,
    notifications,
    setNotifications,
  ] = useContext(NotificationsContext);
  const navigation = useNavigation();
  const [refreshingPosters, setRefreshingPosters] = useState(false);
  const [isPoster, setIsPoster] = useState(false);
  const [posters, setPosters] = useState([]);
  const [refreshingReports, setRefreshingReports] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [reports, setReports] = useState([]);

  // console.log(useContext(NotificationsContext))
  // console.log(val)

  // refreshes the notifications so we can see the newest matches
  const refreshNotifications = () => {
    const userRef = doc(fireStoreDB, "Users", user.uid);
    return updateDoc(userRef, {
      newNotifications: false,
    })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        getDoc(userRef).then((userSnap) => {
          setRefreshingNotifications(false);
          setNewNotification(false);
          if (userSnap.exists()) {
            //console.log("Document data:", userSnap.data());
            const notificationsArray = userSnap.data().notifications;
            if (
              notificationsArray === undefined ||
              notificationsArray.length === 0
            ) {
              setIsNotification(false);
            } else {
              setIsNotification(true);
            }
            setNotifications(notificationsArray);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
      });
  };

  const refreshPosts = (typeOfPost) => {
    const posts = [];
    const userRef = doc(fireStoreDB, "Users", user.uid);
    getDoc(userRef).then((userSnap) => {
      typeOfPost === "Posters"
        ? setRefreshingPosters(false)
        : setRefreshingReports(false);

      const data = userSnap.data();
      const refs = typeOfPost === "Posters" ? data.posters : data.reports;

      if (refs === undefined || refs.length === 0) {
        typeOfPost === "Posters" ? setIsPoster(false) : setIsReport(false);
      } else {
        typeOfPost === "Posters" ? setIsPoster(true) : setIsReport(true);
      }
      const promises = [];
      refs.forEach((ref) => {
        promises.push(getDoc(doc(fireStoreDB, typeOfPost, ref)));
      });
      Promise.all(promises).then((docs) => {
        docs.forEach((doc) => {
          posts.push({ data: doc.data(), id: doc.id });
        });
        typeOfPost === "Posters" ? setPosters(posts) : setReports(posts);
      });
    });
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);
      console.log("UID: " + user.uid);
      // update user document in firestore with the notifications token
      const userRef = doc(fireStoreDB, "Users", user.uid);
      const userSnap = await getDoc(userRef);
      const newNotifications = userSnap.get("newNotifications");
      setNewNotification(newNotifications);

      await updateDoc(userRef, {
        notificationsToken: token,
        notificationsActive: true,
      }).catch((error) => {
        console.log(error);
      });
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNewNotification(true);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const report = response.notification.request.content.data.report;
        navigation.navigate("התראות");
        navigation.navigate("Report", { data: report });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const options = {
    header: (props) => (
      <Header
        {...props}
        newNotification={newNotification}
        refreshNotifications={refreshNotifications}
      />
    ),
  };

  return (
    <NotificationsContext.Consumer>
      {(value) => {
        return (
          <Stack.Navigator
            screenOptions={
              options
            } /*initialRouteName={responseReport === {} ? "התראות" : "Main"}*/
          >
            <Stack.Screen name="Main" component={NavigationBar} />
            <Stack.Screen name="Home" component={OldhomeScreen} />
            <Stack.Screen name="ReportCreation" component={Screen1Report} />
            <Stack.Screen name="ReportCreation2" component={Screen2Report} />
            <Stack.Screen name="ReportCreation3" component={Screen3Report} />

            <Stack.Screen name="PosterCreation" component={Screen1Poster} />
            <Stack.Screen name="PosterCreation2" component={Screen2Poster} />
            <Stack.Screen name="PosterCreation3" component={Screen3Poster} />
            <Stack.Screen name="ReportPage" component={ReportPage} />
            {/*<Stack.Screen name="CreateAd" component={PosterPostingComponent}/>*/}
            <Stack.Screen name="AdPage" component={AdPage} />
            <Stack.Screen name="התראות">
              {(props) => (
                <NotificationsPage
                  {...props}
                  refreshNotifications={refreshNotifications}
                  setNewNotification={setNewNotification}
                />
              )}
            </Stack.Screen>
            {/* <Stack.Screen name="ReportForBrowse" component={ReportForBrowse}/> */}
            <Stack.Screen name="Report" component={ReportForBrowser} />
            <Stack.Screen name="Poster" component={PosterBrowse} />
            <Stack.Screen name="SupportScreen" component={SupportPage} />
            <Stack.Screen name="MyReports">
              {(props) => (
                <MyReports
                  {...props}
                  refreshing={refreshingReports}
                  refreshReports={refreshPosts}
                  data={reports}
                  setData={setReports}
                  isReport={isReport}
                  setIsReport={setIsReport}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="MyPosters">
              {(props) => (
                <MyPosters
                  {...props}
                  refreshing={refreshingPosters}
                  refreshPosters={refreshPosts}
                  data={posters}
                  setData={setPosters}
                  isPoster={isPoster}
                  setIsPoster={setIsPoster}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        );
      }}
    </NotificationsContext.Consumer>
  );
}
