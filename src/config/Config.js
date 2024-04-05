import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCm6K1ZJCd1aby8g6h1E1MbwU_3fPuvj-k",
    authDomain: "crud-fern-35bce.firebaseapp.com",
    projectId: "crud-fern-35bce",
    storageBucket: "crud-fern-35bce.appspot.com",
    messagingSenderId: "1001035309094",
    appId: "1:1001035309094:web:a8cd6f00996f05b15306e7",
    measurementId: "G-EJB6KRPNBZ"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export { auth, db, storage};