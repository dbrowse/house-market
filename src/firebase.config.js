// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAoeT9FsU7KHe9rEYwK7WfmKBbAsSK4T0w",
  authDomain: "house-market-60d15.firebaseapp.com",
  projectId: "house-market-60d15",
  storageBucket: "house-market-60d15.appspot.com",
  messagingSenderId: "146320639903",
  appId: "1:146320639903:web:62a8a8598fc203db861faa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()