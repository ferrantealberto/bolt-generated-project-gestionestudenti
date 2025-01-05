import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqPFQNphHIVCLY1ZFCegyDPDuCkRzOnWM",
  authDomain: "gestione-studenti-14d04.firebaseapp.com",
  projectId: "gestione-studenti-14d04",
  storageBucket: "gestione-studenti-14d04.appspot.com",
  messagingSenderId: "615193814542",
  appId: "1:615193814542:web:c2389d4b19c8c68e07fe5f",
  measurementId: "G-YPZVY2REEK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
