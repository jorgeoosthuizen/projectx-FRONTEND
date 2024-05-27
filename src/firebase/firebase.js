import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZbZbA-rzzU67nu6DuEmA7iypnWJQlIwk",
  authDomain: "projectox-76973.firebaseapp.com",
  projectId: "projectox-76973",
  storageBucket: "projectox-76973.appspot.com",
  messagingSenderId: "1044234975647",
  appId: "1:1044234975647:web:e4afe478b71df0313f25aa",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
