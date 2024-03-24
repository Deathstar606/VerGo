import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FirebaseConfig = {
    apiKey: "AIzaSyD8N-C8r7XMj4tdY6f_88sg3wRqu9sKrBI",
    authDomain: "vergo-877e6.firebaseapp.com",
    projectId: "vergo-877e6",
    storageBucket: "vergo-877e6.appspot.com",
    messagingSenderId: "244918026858",
    appId: "1:244918026858:web:cf950f56449e4edb9c4013",
    measurementId: "G-KJTMGC7LXT"
};

const app = initializeApp(FirebaseConfig);
const firestore = getFirestore(app);

export const auth = getAuth(app);

export {app, firestore} ;