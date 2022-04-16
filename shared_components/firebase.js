import {initializeApp} from "firebase/app";
import {getAuth,} from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAs3eewx9m6kipMfsQkz-37NWQgXF1_fnQ",
    authDomain: "findog-a0110.firebaseapp.com",
    projectId: "findog-a0110",
    storageBucket: "findog-a0110.appspot.com",
    messagingSenderId: "324712450952",
    appId: "1:324712450952:web:e9e35108bcc36e4448883d",
    measurementId: "G-07RKM9JVX9"
};


let Firebase = initializeApp(firebaseConfig);

export const fireAuth = getAuth(Firebase)

export default Firebase;
