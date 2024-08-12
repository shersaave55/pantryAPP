// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: "pantryapp-36301.firebaseapp.com",
  projectId: "pantryapp-36301",
  storageBucket: "pantryapp-36301.appspot.com",
  messagingSenderId: "137990640295",
  appId: "1:137990640295:web:1f0d4a31933b7fd62a4182"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export{app, firestore}