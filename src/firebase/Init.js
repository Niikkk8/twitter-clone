// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7Hvkw8Z4WYU726AxwWu25rsaKW-Nypac",
  authDomain: "twitter-clone-69ea9.firebaseapp.com",
  projectId: "twitter-clone-69ea9",
  storageBucket: "twitter-clone-69ea9.appspot.com",
  messagingSenderId: "647300407396",
  appId: "1:647300407396:web:44a8c5f8fd93b99c72bf71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();