// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClcgO7Tr24sp8ebDH_-XeZdKBGkTFenOY",
    authDomain: "homeoneservice.firebaseapp.com",
    projectId: "homeoneservice",
    storageBucket: "homeoneservice.firebasestorage.app",
    messagingSenderId: "916324341644",
    appId: "1:916324341644:web:7d11dadac9a081109b68a9",
    measurementId: "G-SCK2T0NK65"
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };