
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
