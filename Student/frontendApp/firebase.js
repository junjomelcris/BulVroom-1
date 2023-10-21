// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbkuRt1VIx5xC9C-kX1h1A4tf4slx3sWE",
  authDomain: "bulvroom-da59d.firebaseapp.com",
  projectId: "bulvroom-da59d",
  storageBucket: "bulvroom-da59d.appspot.com",
  messagingSenderId: "245937234226",
  appId: "1:245937234226:web:5d93dc317b1379960d372b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };