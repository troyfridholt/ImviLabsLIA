import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDoc, getDocs, addDoc, setDoc, doc, query , where, updateDoc} from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyC6m6ocr9bAgPP2Mp4Rm5cLxIiRhpKC9RE",
    authDomain: "readingtest-85a9e.firebaseapp.com",
    databaseURL: "https://readingtest-85a9e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "readingtest-85a9e",
    storageBucket: "readingtest-85a9e.appspot.com",
    messagingSenderId: "365748144242",
    appId: "1:365748144242:web:256c330c77fcc03125daeb",
    measurementId: "G-DLXW6KD3XY"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log("Connected to Firestore!");
  
  const ages = ['7-12', '13-16', '17-21', '22+'];

  const usereDoc = doc(db, 'users', 'noahnemhed@hotmail.com')
  const resultSnap = await getDoc(usereDoc)
  console.log(resultSnap.data().results.length)



