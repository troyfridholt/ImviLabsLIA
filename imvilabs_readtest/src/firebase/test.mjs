import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs, addDoc, setDoc, doc, query, where, updateDoc } from "firebase/firestore";

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

const engDoc = doc(db, "text", "ENG");
const ageRangesRef = collection(engDoc, "ageRanges");

// Add documents "7-12", "13-16", "17-21", and "22+" to "ageRanges" subcollection
const ageRanges = ["7-12", "13-16", "17-21", "22+"];
for (const ageRange of ageRanges) {
  const ageRangeDoc = doc(ageRangesRef, ageRange);

  // Add subcollection "levels" to each age range
  const levelsRef = collection(ageRangeDoc, "levels");

  // Add documents "level1", "level2", "level3", "level4", and "level5" to "levels" subcollection
  const levels = ["level1", "level2", "level3", "level4", "level5"];
  for (const level of levels) {
    const levelDoc = doc(levelsRef, level);

    // Add subcollection "texts" to each level
    const textsRef = collection(levelDoc, "texts");

    // Add documents "text1", "text2", "text3", "text4", and "text5" to each "texts" subcollection
    const texts = ["text1", "text2", "text3", "text4", "text5"];
    for (const text of texts) {
      const textDoc = doc(textsRef, text);

      // Add subcollections "questions", "answers", "text" to each text document
      const questionsRef = collection(textDoc, "questions");
      const answersRef = collection(textDoc, "answers");
      const textRef = collection(textDoc, "text");

      // Create the subcollections
      await setDoc(questionsRef.doc(), {});
      await setDoc(answersRef.doc(), {});
      await setDoc(textRef.doc(), {});
    }
  }
}



