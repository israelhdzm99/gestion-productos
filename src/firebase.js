// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "product-management---merkuria.firebaseapp.com",
  projectId: "product-management---merkuria",
  storageBucket: "product-management---merkuria.firebasestorage.app",
  messagingSenderId: "406755959533",
  appId: "1:406755959533:web:9032ed8c798c974e8b62e4",
  measurementId: "G-CMNEYSWPVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
