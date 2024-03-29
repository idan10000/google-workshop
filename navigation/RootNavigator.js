import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";

import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { getAuth, updateProfile } from "firebase/auth";
import { NotificationsProvider } from "./NotificationsProvider";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { fireStoreDB } from "../shared_components/Firebase";
import * as Notifications from "expo-notifications";
import InsertUsername from "../screens/insertUsername";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    // unsubscribe auth listener on unmount
    return getAuth().onAuthStateChanged(async (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        const userRef = doc(fireStoreDB, "Users", authenticatedUser.uid);

        getDoc(userRef).then(async (userSnap) => {
          if (userSnap.exists()) {
            setUsername(userSnap.data().name);
          } else {
            setUsername("");
          }
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9F8F0",
        }}
      >
        <ActivityIndicator size="large" color="#DCA277" />
      </View>
    );
  }

  return (
    <NotificationsProvider>
      <NavigationContainer>
        {user !== null && username !== "" ? (
          <HomeStack username={username} />
        ) : (
          <AuthStack
            username={username}
            setUsername={setUsername}
            setIsLoading={setIsLoading}
          />
        )}
      </NavigationContainer>
    </NotificationsProvider>
  );
}
