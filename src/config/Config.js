
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDCuANE2UcrdtmQxVoHeKruqHK4PAkfO4",
  authDomain: "hamogri.firebaseapp.com",
  projectId: "hamogri",
  storageBucket: "hamogri.appspot.com",
  messagingSenderId: "142312288776",
  appId: "1:142312288776:web:7c3ece97fd242e1beed7bd",
  measurementId: "G-JPZBKK71GS"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);
export {auth,db};