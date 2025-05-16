// // import { initializeApp } from 'firebase/app';
// // import { getAuth, RecaptchaVerifier } from 'firebase/auth';

// import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth ,RecaptchaVerifier} from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyClcgO7Tr24sp8ebDH_-XeZdKBGkTFenOY",
//     authDomain: "homeoneservice.firebaseapp.com",
//     projectId: "homeoneservice",
//     storageBucket: "homeoneservice.firebasestorage.app",
//     messagingSenderId: "916324341644",
//     appId: "1:916324341644:web:994a134f83e926cd9b68a9",
//     measurementId: "G-BCG6Z8T2SS"
// };


// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const auth = getAuth(app);
// auth.useDeviceLanguage();



// export { app, auth, RecaptchaVerifier };

//     // const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

//     // export const auth = getAuth(app)



// // import { getApp, getApps, initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getAuth } from "firebase/auth";0956165959
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //     apiKey: "AIzaSyClcgO7Tr24sp8ebDH_-XeZdKBGkTFenOY",
// //     authDomain: "homeoneservice.firebaseapp.com",
// //     projectId: "homeoneservice",
// //     storageBucket: "homeoneservice.firebasestorage.app",
// //     messagingSenderId: "916324341644",
// //     appId: "1:916324341644:web:994a134f83e926cd9b68a9",
// //     measurementId: "G-BCG6Z8T2SS"
// // };


// // const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// // const auth = getAuth(app);
// // auth.useDeviceLanguage();
// // export { auth }


import { FirebaseApp, initializeApp } from "firebase/app";
import 'firebase/auth'
// Import the functions you need from the SDKs you need


//copy and Paste
const firebaseConfig = {
    apiKey: "AIzaSyClcgO7Tr24sp8ebDH_-XeZdKBGkTFenOY",
    authDomain: "homeoneservice.firebaseapp.com",
    projectId: "homeoneservice",
    storageBucket: "homeoneservice.firebasestorage.app",
    messagingSenderId: "916324341644",
    appId: "1:916324341644:web:994a134f83e926cd9b68a9",
    measurementId: "G-BCG6Z8T2SS"
};


//IT MUST BE LIKE THIS  DONT CHANGE IT
let app: FirebaseApp;
try {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully:', app.name);
} catch (err) {
    console.error('❌ Firebase initialization failed:', err);
}
export { app };
// const app = initializeApp(firebaseConfig);
