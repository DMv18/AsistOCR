// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDjN8JGgvJBWH8xDWmkJaMkCa5B0TLM5bg",
  authDomain: "asistocr-78139.firebaseapp.com",
  projectId: "asistocr-78139",
  storageBucket: "asistocr-78139.firebasestorage.app",
  messagingSenderId: "1082161730117",
  appId: "1:1082161730117:web:e2b55b116b6c60c3b8c92c",
  measurementId: "G-KQN8RQ7E0D"
};


let app;
let auth;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
} else {
  app = firebase.app();
  auth = firebase.auth();
}


export const modularApp = initializeApp(firebaseConfig);
export const modularAuth = getAuth(modularApp);

export { app, auth, firebase };