import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYtLI_riS_pmWSZb2VGn5SsF6KlxLL4to",
  authDomain: "rn-w6-e8bf2.firebaseapp.com",
  projectId: "rn-w6-e8bf2",
  storageBucket: "rn-w6-e8bf2.appspot.com",
  messagingSenderId: "965813549377",
  appId: "1:965813549377:web:643cf0045a0fc0de21c9c0",
  measurementId: "G-90QE1HPNQK",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, doc, deleteDoc };
