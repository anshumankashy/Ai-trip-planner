// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArZY8k36Qy4kP4b8ahFBfpAdtYew-NwWI",
  authDomain: "ai-trip-planner-c6d3b.firebaseapp.com",
  projectId: "ai-trip-planner-c6d3b",
  storageBucket: "ai-trip-planner-c6d3b.firebasestorage.app",
  messagingSenderId: "379963595362",
  appId: "1:379963595362:web:10df2d8eefb10f9b62cf3b",
  measurementId: "G-RF0Y8CJT7H"
};

/// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore()
//const analytics = getAnalytics(app);