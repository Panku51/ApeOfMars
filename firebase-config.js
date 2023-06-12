// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs7zsMewLWsxXxMESHgxzib5MtgY_9ao4",
  authDomain: "apeofmars-30bd3.firebaseapp.com",
  projectId: "apeofmars-30bd3",
  databaseURL: "https://apeofmars-30bd3-default-rtdb.firebaseio.com/",
  storageBucket: "apeofmars-30bd3.appspot.com",
  messagingSenderId: "28414968159",
  appId: "1:28414968159:web:735e70b99ad76c381a76ea",
  measurementId: "G-0WC1V1954L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
