import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs, addDoc, setDoc, doc, query, where, updateDoc } from "firebase/firestore";
import drip from 'drip-nodejs';


const client = drip({ token: "221168f29814a47812a2c1bdba8d6afc", accountId: "9427881" });



const payload = {
  email: "noahnemhed@hotmail.com",
  first_name: "Noah",
  time_zone: "America/Los_Angeles",
  custom_fields: {
    source: "ReadingTest"
  }
};

client.createUpdateSubscriber(payload)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    // Handle errors
  });



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

// Get a reference to the Firestore database
const db = getFirestore(app);




