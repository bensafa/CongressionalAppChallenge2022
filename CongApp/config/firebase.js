import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfpCvR5NWn1byFolAb1yQJcTV_Ngofis0",
  authDomain: "congapp-324e0.firebaseapp.com",
  projectId: "congapp-324e0",
  storageBucket: "congapp-324e0.appspot.com",
  messagingSenderId: "530601347901",
  appId: "1:530601347901:web:8eecf333a08545bf1f5354",
  measurementId: "G-4KWTS11YX3"
};

let Firebase;

Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;