// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqwvmyIFnI_BmQpT7w2k3E_k4HR82Hnzw",
    authDomain: "farmamayoreo-web.firebaseapp.com",
    projectId: "farmamayoreo-web",
    storageBucket: "farmamayoreo-web.appspot.com",
    messagingSenderId: "425495250228",
    appId: "1:425495250228:web:28d34cf971e923dcc99161"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app)

export {auth, db, storage};