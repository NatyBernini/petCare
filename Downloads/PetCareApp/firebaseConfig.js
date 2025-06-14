// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwBIQzCto5HVicj1zBv1N57kAsWnBHrTA",
  authDomain: "petcare-c0ce9.firebaseapp.com",
  projectId: "petcare-c0ce9",
  storageBucket: "petcare-c0ce9.firebasestorage.app",
  messagingSenderId: "815135970412",
  appId: "1:815135970412:android:5d1cb48b480d5cd28d3449"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
