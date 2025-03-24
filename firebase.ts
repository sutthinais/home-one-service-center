// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDie8XN-VrDQ_dF2Abbnjuceg-r4N0p_w",
    authDomain: "homeoneservicecenter.firebaseapp.com",
    projectId: "homeoneservicecenter",
    storageBucket: "homeoneservicecenter.firebasestorage.app",
    messagingSenderId: "700301511820",
    appId: "1:700301511820:web:5fe038c40a457b2026ffa9",
    measurementId: "G-P01372KFR7"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth }