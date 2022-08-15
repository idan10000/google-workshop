import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";

import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { getAuth, updateProfile } from "firebase/auth";
import { NotificationsProvider } from "./NotificationsProvider";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { fireStoreDB } from "../shared_components/Firebase";

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    // unsubscribe auth listener on unmount
    return getAuth().onAuthStateChanged(async (authenticatedUser) => {
      try {
        console.log("AUTHENTICATED USER:");
        console.log(authenticatedUser);
        if (authenticatedUser) {
          setUser(authenticatedUser);
          getDoc(doc(fireStoreDB, "Users", authenticatedUser.uid))
            .then(async (userSnap) => {
              console.log("getDoc");
              console.log(authenticatedUser.uid);
              if (!userSnap.exists()) {
                console.log("dont exist");
                await setDoc(doc(fireStoreDB, "Users", authenticatedUser.uid), {
                  name: "name",
                  phone: authenticatedUser.phoneNumber,
                  reports: [],
                  posters: [],
                }).catch((error) => {
                  console.log("we are here");
                  console.log(error);
                });
                //await updateProfile(authenticatedUser, {displayName: name});
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NotificationsProvider>
      <NavigationContainer>
        {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </NotificationsProvider>
  );
}
