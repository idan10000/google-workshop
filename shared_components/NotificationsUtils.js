import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { doc, updateDoc } from "firebase/firestore";
import { fireStoreDB } from "./Firebase";
import { Alert } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export async function turnOffNotifications(user) {
  const userRef = doc(fireStoreDB, "Users", user.uid);
  await updateDoc(userRef, {
    notificationsActive: false,
  })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
}

export async function clearAllNotificationsFirebase(user) {
  const userRef = doc(fireStoreDB, "Users", user.uid);
  await updateDoc(userRef, {
    notifications: [],
    newNotifications: false,
  }).catch((error) => {
    console.log(error);
  });
}

export async function clearAllNotifications(user) {
  Alert.alert(
    "למחוק את כל ההתראות?",
    "לא יהיה ניתן לשחזר אותן לאחר מכן!",
    [
      { text: "ביטול", onPress: () => {} },
      {
        text: "אישור",
        onPress: async () => {
          await clearAllNotificationsFirebase(user);
        },
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {},
    }
  );
}
