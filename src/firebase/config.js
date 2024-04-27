// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFrgaP67tbemBUhj1Jfz-j32p1so_cPSE",
  authDomain: "journal-app-2bbd9.firebaseapp.com",
  projectId: "journal-app-2bbd9",
  storageBucket: "journal-app-2bbd9.appspot.com",
  messagingSenderId: "926078918192",
  appId: "1:926078918192:web:847b855ae72c550daa17f5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp ); // para la autenticacion
export const FirebaseDB = getFirestore( FirebaseApp ); // configuracion de la DB