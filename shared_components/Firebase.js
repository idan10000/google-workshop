import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  FirestoreSettings,
  initializeFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import uuid from "react-native-uuid";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs3eewx9m6kipMfsQkz-37NWQgXF1_fnQ",
  authDomain: "findog-a0110.firebaseapp.com",
  databaseURL:
    "https://findog-a0110-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "findog-a0110",
  storageBucket: "findog-a0110.appspot.com",
  messagingSenderId: "324712450952",
  appId: "1:324712450952:web:e9e35108bcc36e4448883d",
  measurementId: "G-07RKM9JVX9",
};

export let Firebase = initializeApp(firebaseConfig);
export let fireStoreDB = initializeFirestore(Firebase, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false, // add this line
});
export const fireAuth = getAuth(Firebase);
export const fireStorage = getStorage(Firebase);

// upload an image to firebase storage, inputs the URI of the image and the folder where it will be uploaded to.
// returns an object containing the path and the link (download link of the image)
export async function uploadImageAsync(uri, folder) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const path = folder + "/" + uuid.v4();
  const storageImageRef = ref(fireStorage, path);
  const snapshot = await uploadBytes(storageImageRef, blob).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });

  const downloadLink = await getDownloadURL(storageImageRef);
  console.log(downloadLink);
  blob.close();
  return { path: path, link: downloadLink };
}

// get the phone number of the user
export async function getPhoneNumber(user) {
  console.log("start get phone number for", user.uid);
  const userRef = firebase.firesore().collection("Users");
  await userRef
    .doc(user.uid.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data().phone;
      } else {
        console.log("No such document!");
      }
    });
  return "";
}

// update the phone number of the user
export async function updatePhoneNumber(user, num) {
  console.log("start update phone number for", user.uid);
  const userRef = firebase.firesore().collection("Users");
  await userRef
    .doc(user.uid.toString())
    .update({ phone: num })
    .then(() => {
      console.log("phone updated! ");
    });
}
export async function getPosters(user) {}
export async function deletePoster(posterKey) {}
