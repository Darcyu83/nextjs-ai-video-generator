// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nextjs-ai-video-generato-24256.firebaseapp.com",
  projectId: "nextjs-ai-video-generato-24256",
  storageBucket: "nextjs-ai-video-generato-24256.firebasestorage.app",
  messagingSenderId: "599775034858",
  appId: "1:599775034858:web:26845a62cf56ada6d30693",
  measurementId: "G-CCSH0E4XNQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebasestorage = getStorage(app);
