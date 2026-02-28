// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAGPUHsI-gX67ISkXBhIl6-Lr0Uo9enKX4",
  authDomain: "yipias-web-f06e1.firebaseapp.com",
  projectId: "yipias-web-f06e1",
  storageBucket: "yipias-web-f06e1.firebasestorage.app",
  messagingSenderId: "454915066576",
  appId: "1:454915066576:web:eb5a4235d6a8b3ded12cd5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;