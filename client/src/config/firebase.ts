// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHmLfydDYqr75tFitRzHJdM9LYXIMKLks",
  authDomain: "sandbox-d0643.firebaseapp.com",
  projectId: "sandbox-d0643",
  storageBucket: "sandbox-d0643.firebasestorage.app",
  messagingSenderId: "201888437233",
  appId: "1:201888437233:web:4fa5430e0ae56fca72aa50",
  measurementId: "G-FMHFK5WVJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;